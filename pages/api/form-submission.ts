import { NextApiRequest, NextApiResponse } from 'next'
import { groq } from 'next-sanity'
import { Resend } from 'resend'

import FormEmail from '@/components/form/email'
import { IForm } from '@/components/form/types'
import {
  generateSchema,
  sanitizeTextField,
  validateTextField,
} from '@/components/form/utils'
import { getClient } from '@/lib/sanity.client'
import { formQuery } from '@/lib/sanity.queries'

const resend = new Resend(process.env.RESEND_API_KEY)

const client = getClient()

export default async function contactHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // If the request is not a POST, return a 500
  if (!req.body) {
    return res.status(400).json({ status: 'Bad Request' })
  }

  // If the form submission is missing a slug or singleton, return a 500
  if (!req.body.slug && !req.body.singleton) {
    return res.status(400).json({ status: 'Bad Request' })
  }
  const { slug, singleton, ...formSubmission } = req.body
  try {
    // Fetch the form settings from Sanity
    const formSettings: IForm = singleton
      ? await client.fetch(groq`*[_type=="${singleton}"][0] {
        ${formQuery}
      }.form`)
      : await client.fetch(groq`*[slug.current=="${slug}"][0] {
        ${formQuery}
      }.form`)

    // If the form settings are not found, return a 500
    if (!formSettings) {
      return res.status(400).json({ status: 'Form Not Found' })
    }

    // Generate a schema from the form settings
    const schema = generateSchema(formSettings.fields)
    // Validate the form submission against the schema
    const result = schema.safeParse(formSubmission)

    // If the form submission is not valid, return a 500
    if (result.success === false) {
      return res
        .status(400)
        .json({ status: 'Validation Error', errors: result.error.errors })
    }

    // Extract the name, email, message, and custom fields from the form submission
    const { name, email, message, customFields } = result.data

    let customFieldErrors = []
    const submittedCustomFields = customFields || []

    // Validate the custom fields
    formSettings.fields.customFields.forEach((fieldConfig) => {
      const submittedField = submittedCustomFields.find(
        (field) => field.label === fieldConfig.label,
      )
      // If the field is required and not present, add an error
      if (fieldConfig.required && !submittedField?.value) {
        customFieldErrors.push({
          field: fieldConfig.label,
          message: `${fieldConfig.label} is required`,
        })
      }
      // If the field is a select or radio and the value is not in the options, add an error
      if (
        (fieldConfig.type === 'select' || fieldConfig.type === 'radio') &&
        !fieldConfig.options.includes(submittedField?.value)
      ) {
        customFieldErrors.push({
          field: fieldConfig.label,
          message: `Please select a valid option for ${fieldConfig.label}`,
        })
      }
      // Sanitize the value of the field
      if (submittedField?.value) {
        const sanitizedValue = sanitizeTextField(submittedField.value)
        if (!validateTextField(sanitizedValue)) {
          customFieldErrors.push({
            field: fieldConfig.label,
            message: `Invalid value for ${fieldConfig.label}`,
          })
        }
      }
    })

    if (customFieldErrors.length > 0) {
      return res
        .status(400)
        .json({ status: 'Validation Error', errors: customFieldErrors })
    }

    try {
      // Send the email
      await resend.emails.send({
        from: formSettings.from,
        to: formSettings.to,
        subject: formSettings.subject,
        text: `Name: ${name}\nEmail: ${email}\ncustomFields: ${JSON.stringify(customFields)}\nMessage: ${message}`,
        react: FormEmail({ name, email, customFields, message }),
      })
      return res.status(200).json({ status: 'OK' })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        status: 'Internal Server Error',
        message: 'Failed to send email. Please try again later',
      })
    }
  } catch (err) {
    console.error(err)
    return res.status(500).json({
      status: 'Internal Server Error',
      message: 'Failed to process form submission. Please try again later',
    })
  }
}
