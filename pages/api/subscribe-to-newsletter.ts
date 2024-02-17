import { NextApiRequest, NextApiResponse } from 'next'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY_NEWSLETTER)

export default async function newsletterHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // If the request is not a POST, return a 500
  if (!req.body) {
    return res.status(400).json({ status: 'Bad Request', message: 'No body' })
  }
  const { email } = req.body

  try {
    if (!email) {
      return res
        .status(400)
        .json({ status: 'Bad Request', message: 'No email' })
    }

    if (!process.env.RESEND_AUDIENCE_ID) {
      return res.status(500).json({
        status: 'Internal Server Error',
        message: 'RESEND_AUDIENCE_ID is not set',
      })
    }

    try {
      // Send the email
      const response = await resend.contacts.create({
        audienceId: process.env.RESEND_AUDIENCE_ID,
        email,
      })
      if (response.error) {
        console.log(response.error)
        return res.status(500).json({
          status: 'Internal Server Error',
          message: 'Failed to subscribe to newsletter. Please try again later.',
        })
      }

      return res.status(200).json({ status: 'OK' })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        status: 'Internal Server Error',
        message: 'Failed to subscribe to newsletter. Please try again later.',
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
