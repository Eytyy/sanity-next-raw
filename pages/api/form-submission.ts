import { NextApiRequest, NextApiResponse } from 'next'
import { groq } from 'next-sanity'
import { Resend } from 'resend'

import FormEmail from '@/components/form/email'
import { generateSchema } from '@/components/form/utils'
import { getClient } from '@/lib/sanity.client'
import { formQuery } from '@/lib/sanity.queries'

const resend = new Resend(process.env.RESEND_API_KEY)

const emailConfig = {
  from: 'Eytyy',
  to: ['e.tayyem@gmail.com'],
  subject: 'Contact Form Submission',
}

const client = getClient()

export default async function contactHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (!req.body) {
    return res.status(500).json({ status: 'Bad Request' })
  }
  if (!req.body.slug && !req.body.singleton) {
    return res.status(500).json({ status: 'Bad Request' })
  }
  const { slug, singleton, ...formSubmission } = req.body
  try {
    const formFields = singleton
      ? await client.fetch(groq`*[_type=="${singleton}"][0] {
        ${formQuery}
      }.form.fields`)
      : await client.fetch(groq`*[slug.current=="${slug}"][0] {
        ${formQuery}
      }.form.fields`)

    if (!formFields) {
      return res.status(500).json({ status: 'Bad Request' })
    }
    const schema = generateSchema(formFields)
    const result = schema.safeParse(formSubmission)
    if (result.success === false) {
      console.log(result.error)
      return res.status(500).json({ status: 'Bad Request' })
    }

    const { name, email, message, customFields } = result.data
    try {
      await resend.emails.send({
        ...emailConfig,
        text: `Name: ${name}\nEmail: ${email}\customFields: ${JSON.stringify(customFields)}\nMessage: ${message}`,
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
