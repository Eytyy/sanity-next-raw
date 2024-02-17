import React, { ForwardedRef } from 'react'
import { UseFormRegister } from 'react-hook-form'
import { z } from 'zod'

import Input from './Input'
import Radio from './Radio'
import Select from './Select'
import TextArea from './TextArea'
import { FormFieldProps } from './types'

const FormField = React.forwardRef<
  HTMLElement,
  FormFieldProps &
    ReturnType<
      UseFormRegister<typeof z.ZodObject<{ [key: string]: z.ZodTypeAny }>>
    >
>((fieldProps, ref: ForwardedRef<HTMLFormElement>) => {
  switch (fieldProps.type) {
    case 'input':
    case 'email':
    case 'tel':
      return <Input ref={ref} {...fieldProps} />
    case 'textarea':
      return <TextArea ref={ref} {...fieldProps} />
    case 'select':
      return <Select ref={ref} {...fieldProps} />
    case 'radio':
      return <Radio ref={ref} {...fieldProps} />
    default:
      return null
  }
})

FormField.displayName = 'FormField'

export default FormField
