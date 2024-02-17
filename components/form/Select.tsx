import { OptionsFormFieldProps } from './types'

export function Select(field: OptionsFormFieldProps) {
  return (
    <div>
      <select
        className="border p-2 rounded-md w-full focus:outline-none focus:border-black"
        name={field.name}
        required={field.required}
      >
        <option value="">
          {field.placeholder || `Select a ${field.label.toLowerCase()}`}
        </option>
        {field.options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}
