import { NextApiRequest, NextApiResponse } from 'next'
import { groq } from 'next-sanity'
import { Resend } from 'resend'

import FormEmail from '@/components/form/email'
import { IForm } from '@/components/form/types'
import { generateSchema } from '@/components/form/utils'
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
    return res.status(500).json({ status: 'Bad Request' })
  }

  // If the form submission is missing a slug or singleton, return a 500
  if (!req.body.slug && !req.body.singleton) {
    return res.status(500).json({ status: 'Bad Request' })
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
      return res.status(500).json({ status: 'Bad Request' })
    }

    // Generate a schema from the form settings
    const schema = generateSchema(formSettings.fields)
    // Validate the form submission against the schema
    const result = schema.safeParse(formSubmission)

    // If the form submission is not valid, return a 500
    if (result.success === false) {
      console.log(result.error)
      return res.status(500).json({ status: 'Bad Request' })
    }

    // Extract the name, email, message, and custom fields from the form submission
    const { name, email, message, customFields } = result.data

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
      return res.status(500).json({ status: 'Internal Server Error' })
    }
  } catch (err) {
    console.error(err)
    return res.status(500).json({ status: 'Internal Server Error' })
  }
}
