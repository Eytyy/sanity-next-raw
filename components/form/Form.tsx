import { zodResolver } from '@hookform/resolvers/zod'
import React, { useMemo } from 'react'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import FormField from './FormField'
import FormMessage from './FormMessage'
import { IForm } from './types'
import { generateSchema } from './utils'

async function sendEmail(data: { [key: string]: any }) {
  const response = await fetch('/api/form-submission', {
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

export default function Form({ fields, singleton, slug }: IForm) {
  const [submitting, setSubmitting] = React.useState(false)
  const schema = useMemo(() => generateSchema(fields), [fields])

  const { reset, register, handleSubmit, formState, control } = useForm<
    z.infer<typeof schema>
  >({
    defaultValues: {
      singleton,
      slug,
      customFields: fields.customFields.map((field) => ({
        value: '',
        label: field.label,
      })),
      message: {
        label: fields.messageField?.label,
      },
    },
    resolver: zodResolver(schema),
  })

  const { fields: customFields } = useFieldArray({
    control,
    name: 'customFields',
  })

  const processForm: SubmitHandler<z.infer<typeof schema>> = async (data) => {
    try {
      setSubmitting(true)
      await sendEmail(data)
      toast.success('Email sent!')
      setSubmitting(false)
      reset()
    } catch (e) {
      setSubmitting(false)
      // toast error
      reset(data)
      toast.error('Something went wrong! Please try again.')
    }
  }

  return (
    <form onSubmit={handleSubmit(processForm)} className="space-y-8 max-w-2xl">
      {fields.nameField && (
        <div>
          <FormField
            {...fields.nameField}
            {...register(fields.nameField.name as any)}
          />
          <FormMessage message={formState.errors.name?.message as string} />
        </div>
      )}
      {fields.emailField && (
        <div>
          <FormField
            {...fields.emailField}
            {...register(fields.emailField.name as any)}
          />
          <FormMessage message={formState.errors.email?.message as string} />
        </div>
      )}
      {fields.messageField && (
        <div>
          <FormField
            {...fields.messageField}
            name={`${fields.messageField.name}.value`}
            {...register(`${fields.messageField.name}.value` as any)}
          />
          <FormMessage
            message={formState.errors.message?.['value']?.message as string}
          />
        </div>
      )}
      {customFields.map((field, index) => {
        const { name, ...fieldProps } = fields.customFields[index]
        return (
          <div key={field.id}>
            <FormField
              {...fieldProps}
              {...register(`customFields.${index}.value` as any)}
            />
            <FormMessage
              message={
                formState.errors.customFields?.[index]?.['value']
                  .message as string
              }
            />
          </div>
        )
      })}
      <button
        disabled={submitting}
        className="bg-black text-white p-2 rounded-md w-full focus:outline-none m-0 hover:bg-black/80 transition-colors duration-300 ease-in-out disabled:bg-black/10"
        type="submit"
      >
        {submitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  )
}
