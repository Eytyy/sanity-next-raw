import React from 'react'

interface SharedFormFieldProps {
  _key: string
  label: string
  name: string
  required: boolean
  placeholder?: string
}

interface TextFormFieldProps extends SharedFormFieldProps {
  type: 'text' | 'email' | 'tel' | 'textarea'
}

interface OptionsFormFieldProps extends SharedFormFieldProps {
  type: 'select' | 'radio'
  options: string[]
}

export type FormFieldProps = TextFormFieldProps | OptionsFormFieldProps

export default function Form({ fields }: { fields: FormFieldProps[] }) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl">
      {fields.map((field) => (
        <div key={field._key}>
          <FormField {...field} />
        </div>
      ))}
      <button
        className="bg-black text-white p-2 rounded-md w-full focus:outline-none"
        type="submit"
      >
        Submit
      </button>
    </form>
  )
}

function FormField(field: FormFieldProps) {
  switch (field.type) {
    case 'text':
    case 'email':
    case 'tel':
    case 'textarea':
      return <TextField {...field} />
    case 'select':
      return <SelectField {...field} />
    case 'radio':
      return <RadioField {...field} />
    default:
      return null
  }
}

function TextField(field: TextFormFieldProps) {
  return (
    <div className="relative">
      <label
        className="absolute top-2 left-2 text-sm z-10 text-gray-500"
        htmlFor={field.name}
      >
        {field.label}
      </label>
      {field.type === 'textarea' ? (
        <textarea
          className="border p-2 pt-8 rounded-md w-full focus:outline-none focus:border-black"
          name={field.name}
          required={field.required}
          rows={4}
        />
      ) : (
        <input
          className="border p-2 pt-8 rounded-md w-full focus:outline-none focus:border-black"
          type={field.type}
          name={field.name}
          required={field.required}
        />
      )}
    </div>
  )
}

function SelectField(field: OptionsFormFieldProps) {
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

function RadioField(field: OptionsFormFieldProps) {
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
