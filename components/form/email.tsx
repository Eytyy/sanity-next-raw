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
  <div>
    <p>
      From <strong>{name}</strong>, {email}.
    </p>
    {message.value && (
      <div>
        <h2>{message.label}</h2>
        <p>{message.value}</p>
      </div>
    )}
    <div>
      {customFields.map((field, index) => (
        <div key={`customField${index}`}>
          <h2>{field.label}</h2>
          <p>{field.value}</p>
        </div>
      ))}
    </div>
  </div>
)

export default FormEmail
