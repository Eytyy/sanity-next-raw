export interface SharedFormFieldProps {
  _key: string
  label: string
  name: string
  required: boolean
  placeholder?: string
}

export interface MessageFieldProps extends SharedFormFieldProps {
  _type: 'messageField'
  type: 'textarea'
}

export interface EmailFieldProps extends SharedFormFieldProps {
  _type: 'emailField'
  type: 'email'
}

export interface NameFieldProps extends SharedFormFieldProps {
  _type: 'nameField'
  type: 'input'
}

export interface PhoneFieldProps extends SharedFormFieldProps {
  _type: 'phone'
  type: 'tel'
}

export type DefaultFormFieldProps =
  | MessageFieldProps
  | EmailFieldProps
  | NameFieldProps
  | PhoneFieldProps

export interface OptionsFormFieldProps extends SharedFormFieldProps {
  type: 'select' | 'radio'
  options: string[]
}

export interface InputFormFieldProps extends SharedFormFieldProps {
  type: 'input' | 'tel' | 'email'
}

export interface TextareaFormFieldProps extends SharedFormFieldProps {
  type: 'textarea'
}

export type CustomFormFieldProps = {
  _type: 'customField'
} & (OptionsFormFieldProps | InputFormFieldProps | TextareaFormFieldProps)

export type FormFieldProps = DefaultFormFieldProps | CustomFormFieldProps

export interface IForm {
  from: string
  to: string
  subject: string
  singleton?: string
  slug?: string
  fields: {
    messageField: MessageFieldProps
    emailField: EmailFieldProps
    nameField: NameFieldProps
    customFields: CustomFormFieldProps[]
  }
}
