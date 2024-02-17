import React, { ForwardedRef } from 'react'
import { UseFormRegister } from 'react-hook-form'
import { z } from 'zod'

import { InputFormFieldProps } from './types'

const Input = React.forwardRef<
  HTMLInputElement,
  InputFormFieldProps &
    ReturnType<
      UseFormRegister<typeof z.ZodObject<{ [key: string]: z.ZodTypeAny }>>
    >
>((fieldProps, ref: ForwardedRef<HTMLInputElement>) => {
  const [labelHeight, setLabelHeight] = React.useState(0)

  return (
    <div className="relative">
      <label
        ref={(el) => {
          if (el) {
            setLabelHeight(el.clientHeight)
          }
        }}
        className="absolute top-2 left-2 text-sm z-10 text-gray-500"
        htmlFor={fieldProps.name}
      >
        {fieldProps.label}
      </label>
      <input
        ref={ref}
        id={fieldProps.name}
        name={fieldProps.name}
        onChange={fieldProps.onChange}
        onBlur={fieldProps.onBlur}
        className="text-sm border p-2 pt-8 rounded-md w-full focus:outline-none focus:shadow-md"
        style={{
          paddingTop: `${labelHeight + 12}px`,
        }}
      />
    </div>
  )
})

Input.displayName = 'Input'

export default Input
