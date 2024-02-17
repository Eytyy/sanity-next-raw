import React, { ForwardedRef } from 'react'
import { UseFormRegister } from 'react-hook-form'
import { z } from 'zod'

import { TextareaFormFieldProps } from './types'

const TextArea = React.forwardRef<
  HTMLTextAreaElement,
  TextareaFormFieldProps &
    ReturnType<
      UseFormRegister<typeof z.ZodObject<{ [key: string]: z.ZodTypeAny }>>
    >
>((fieldProps, ref: ForwardedRef<HTMLTextAreaElement>) => {
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
      <textarea
        id={fieldProps.name}
        ref={ref}
        name={fieldProps.name}
        onChange={fieldProps.onChange}
        onBlur={fieldProps.onBlur}
        className="text-sm border p-2 pt-8 rounded-md w-full focus:outline-none focus:shadow-md"
        style={{
          paddingTop: `${labelHeight + 8}px`,
        }}
      />
    </div>
  )
})

TextArea.displayName = 'TextArea'

export default TextArea
