import { NextApiRequest, NextApiResponse } from 'next'
import { Resend } from 'resend'

import ContactFormEmail from '@/components/form/email'

const resend = new Resend(process.env.RESEND_API_KEY)

const emailConfig = {
  from: 'Nanoxort LLC contact@nanoxort.com',
  to: ['contact@nanoxort.com'],
  subject: 'Contact Form Submission',
}

export default async function contactHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // if (!req.body) {
  //   return res.status(500).json({ status: 'Bad Request' })
  // }
  // const result = ContactFormSchema.safeParse(req.body)
  // if (!result.success) {
  //   console.log('Error: ', result.error)
  //   return res.status(500).json({ status: 'Bad Request' })
  // }
  // const { name, email, affiliation, message } = result.data
  // try {
  //   await resend.emails.send({
  //     ...emailConfig,
  //     text: `Name: ${name}\nEmail: ${email}\nAffiliation: ${affiliation}\nMessage: ${message}`,
  //     react: ContactFormEmail({ name, email, affiliation, message }),
  //   })
  //   return res.status(200).json({ status: 'OK' })
  // } catch (err) {
  //   console.log(err)
  //   return res.status(500).json({ status: 'Internal Server Error' })
  // }
}
