import { Tailwind } from '@react-email/tailwind'

interface FormEmailProps {
  name: string
  email: string
  message: {
    value?: string
    label?: string
  }
  customFields: any[]
}

const FormEmail: React.FC<Readonly<FormEmailProps>> = ({
  name,
  email,
  message,
  customFields,
}) => (
  <Tailwind>
    <div>
      <p>
        From <strong>${name}</strong>
        {`(${email}).`}
      </p>
      {message.value && <p>{message.value}</p>}
      <div>
        {customFields.map((field, index) => (
          <div key={`customField${index}`}>
            <div className="font-bold">{field.label}</div>
            <p>{field.value}</p>
          </div>
        ))}
      </div>
    </div>
  </Tailwind>
)

export default FormEmail
