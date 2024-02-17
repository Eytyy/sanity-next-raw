import { zodResolver } from '@hookform/resolvers/zod'
import React, { useMemo } from 'react'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'

import FormField from './FormField'
import FormMessage from './FormMessage'
import { IForm } from './types'
import { generateSchema } from './utils'

async function sendEmail(data: { [key: string]: string }) {
  return fetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json())
}

export default function Form({ fields }: IForm) {
  const schema = useMemo(() => generateSchema(fields), [fields])

  const { reset, register, handleSubmit, formState, control } = useForm<
    z.infer<typeof schema>
  >({
    defaultValues: {
      customFields: fields.customFields.map((field) => ({
        [field.name]: '',
      })),
    },
    resolver: zodResolver(schema),
  })

  const { fields: customFields } = useFieldArray({
    control,
    name: 'customFields',
  })

  const processForm: SubmitHandler<z.infer<typeof schema>> = async (data) => {
    try {
      console.log(data)
      // const result = await sendEmail(data)
      // toast.success('Email sent!')
      reset()
      return
    } catch (e) {
      // toast error
      reset(data)
      // toast.error('Something went wrong! Please try again.')
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
            {...register(fields.messageField.name as any)}
          />
          <FormMessage message={formState.errors.message?.message as string} />
        </div>
      )}
      {customFields.map((field, index) => {
        const { name, ...fieldProps } = fields.customFields[index]
        return (
          <div key={field.id}>
            <FormField
              {...fieldProps}
              {...register(`customFields.${index}.customField${index}` as any)}
            />
            <FormMessage
              message={
                formState.errors.customFields?.[index]?.[`customField${index}`]
                  ?.message as string
              }
            />
          </div>
        )
      })}
      <button
        className="bg-black text-white p-2 rounded-md w-full focus:outline-none m-0"
        type="submit"
      >
        Submit
      </button>
    </form>
  )
}
