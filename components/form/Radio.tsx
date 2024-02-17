import React, { ForwardedRef } from 'react'
import { UseFormRegister } from 'react-hook-form'
import { z } from 'zod'

import { OptionsFormFieldProps } from './types'

const Radio = React.forwardRef<
  HTMLInputElement,
  OptionsFormFieldProps &
    ReturnType<
      UseFormRegister<typeof z.ZodObject<{ [key: string]: z.ZodTypeAny }>>
    >
>((fieldProps, ref: ForwardedRef<HTMLInputElement>) => {
  return (
    <div>
      <label className="text-sm z-10 text-gray-500" htmlFor={fieldProps.name}>
        {fieldProps.label}
      </label>
      <fieldset className="flex items-center gap-8">
        {fieldProps.options.map((option) => {
          return (
            <label key={option} className="text-sm flex items-center gap-1">
              <input
                ref={ref}
                type="radio"
                name={fieldProps.name}
                value={option}
                onChange={fieldProps.onChange}
                onBlur={fieldProps.onBlur}
              />
              {option}
            </label>
          )
        })}
      </fieldset>
    </div>
  )
})

Radio.displayName = 'Radio'

export default Radio
