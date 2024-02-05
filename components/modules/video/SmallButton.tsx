import React, { PropsWithChildren } from 'react'

type Props = {
  onClick: () => void
}

export default function SmallButton({
  onClick,
  children,
}: PropsWithChildren<Props>) {
  return (
    <button
      role="button"
      aria-label="Play video"
      onClick={onClick}
      className="text-2xl text-black shadow-md bg-white rounded-full p-2"
    >
      {children}
    </button>
  )
}
