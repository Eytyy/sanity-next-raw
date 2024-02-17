import React from 'react'

type Props = {
  message?: string
}

export default function FormMessage({ message }: Props) {
  if (!message) return null
  return (
    <div className="text-red-500 text-sm" role="alert">
      {message}
    </div>
  )
}
