import { OptionsFormFieldProps } from './types'

export default function Radio(field: OptionsFormFieldProps) {
  return (
    <fieldset>
      {field.options.map((option) => (
        <label key={option}>
          <input
            type="radio"
            name={field.name}
            value={option}
            required={field.required}
          />
          {option}
        </label>
      ))}
    </fieldset>
  )
}
