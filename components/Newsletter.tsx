import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import FormField from './form/FormField'
import FormMessage from './form/FormMessage'

async function subscribe(data: { [key: string]: any }) {
  const response = await fetch('/api/subscribe-to-newsletter', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const result = await response.json()
  if (response.ok) {
    return result
  }
  throw new Error(result)
}

export default function Newsletter() {
  const [submitting, setSubmitting] = React.useState(false)
  const schema = z.object({
    email: z.string().email().min(1, { message: 'Email is required' }),
  })

  const { reset, register, handleSubmit, formState } = useForm<
    z.infer<typeof schema>
  >({
    resolver: zodResolver(schema),
  })

  const processForm: SubmitHandler<z.infer<typeof schema>> = async (data) => {
    try {
      setSubmitting(true)
      await subscribe(data)
      toast.success('Thank you for subscribing!')
      setSubmitting(false)
      reset()
    } catch (e) {
      setSubmitting(false)
      // toast error
      reset(data)
      toast.error('There was an error subscribing. Please try again.')
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Subscribe to our newsletter</h2>
      <form onSubmit={handleSubmit(processForm)} className="max-w-xl">
        <div className="w-full relative">
          <FormField
            _type="emailField"
            _key="email"
            name="email"
            label="Email"
            type="email"
            required={true}
            {...register('email' as any)}
          />
          <FormMessage message={formState.errors.email?.message as string} />
          <button
            disabled={submitting}
            className="absolute top-1/2 -translate-y-1/2 right-4 bg-black flex-grow-0 text-white p-2 rounded-md  focus:outline-none m-0 hover:bg-black/80 transition-colors duration-300 ease-in-out disabled:bg-black/10"
            type="submit"
          >
            {submitting ? 'Subscribing...' : 'Subscribe'}
          </button>
        </div>
      </form>
    </div>
  )
}
