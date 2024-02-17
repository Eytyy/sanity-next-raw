import React, { ForwardedRef } from 'react'
import { UseFormRegister } from 'react-hook-form'
import { z } from 'zod'

import { OptionsFormFieldProps } from './types'

const Select = React.forwardRef<
  HTMLSelectElement,
  OptionsFormFieldProps &
    ReturnType<
      UseFormRegister<typeof z.ZodObject<{ [key: string]: z.ZodTypeAny }>>
    >
>((fieldProps, ref: ForwardedRef<HTMLSelectElement>) => {
  const [labelHeight, setLabelHeight] = React.useState(0)

  return (
    <div className="relative">
      <label
        className="absolute top-2 left-3 text-sm z-10 text-gray-500"
        htmlFor={fieldProps.name}
        ref={(el) => {
          if (el) {
            setLabelHeight(el.clientHeight)
          }
        }}
      >
        {fieldProps.label}
      </label>
      <select
        ref={ref}
        id={fieldProps.name}
        name={fieldProps.name}
        onChange={fieldProps.onChange}
        onBlur={fieldProps.onBlur}
        className="border p-2 rounded-md w-full focus:outline-none focus:border-black"
        style={{ paddingTop: `${labelHeight + 12}px` }}
      >
        <option value="">
          {fieldProps.placeholder ||
            `Select a ${fieldProps.label.toLowerCase()}`}
        </option>
        {fieldProps.options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
})

Select.displayName = 'Select'

export default Select
