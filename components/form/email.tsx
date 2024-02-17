interface FormEmailProps {
  name: string
  email: string
  message: string
  affiliation: string
}

const FormEmail: React.FC<Readonly<FormEmailProps>> = ({
  name,
  email,
  message,
  affiliation,
}) => (
  <div>
    <p>
      From <strong>{name}</strong>, ${affiliation}, {email}.
    </p>
    <p>{message}</p>
  </div>
)

export default FormEmail
