import { z } from 'zod'

import { FormFieldProps, IForm } from '@/components/form/types'

export const parseZodType = (field: FormFieldProps) => {
  switch (field.type) {
    case 'email':
      return field.required
        ? z
            .string()
            .min(1, {
              message: `${field.label} is required`,
            })
            .email({
              message: 'Invalid email',
            })
        : z.string().email().optional()
    case 'tel':
      return field.required ? z.string().min(1) : z.string().min(1).optional()
    case 'input':
      return field.required
        ? z.string().min(1, {
            message: `${field.label} is required`,
          })
        : z
            .string()
            .min(10, {
              message: `${field.label} is too short`,
            })
            .optional()
    case 'textarea':
      return z.string().min(1, {
        message: `${field.label} is required`,
      })
    case 'select':
    case 'radio':
    default:
      return field.required
        ? z.string().refine((val) => field.options?.includes(val), {
            message: 'Please select an option',
          })
        : z.string().optional()
  }
}

export const generateSchema = (fields: IForm['fields']) => {
  const customFieldSchemas = fields.customFields.reduce((acc, field, index) => {
    acc = {
      value: parseZodType(field),
      label: z.string(),
    }
    return acc
  }, {})
  const schema = z.object({
    singleton: z.string().optional(),
    slug: z.string().optional(),
    ...(fields.nameField && { name: parseZodType(fields.nameField) }),
    ...(fields.emailField && { email: parseZodType(fields.emailField) }),
    ...(fields.messageField && {
      message: z.object({
        value: z.string().min(1, {
          message: `${fields.messageField.label} is required`,
        }),
        label: z.string().min(1, {
          message: `${fields.messageField.label} is required`,
        }),
      }),
    }),
    customFields: z.array(z.object(customFieldSchemas)),
  })
  return schema
}
