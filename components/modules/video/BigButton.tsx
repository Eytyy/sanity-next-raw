import React, { PropsWithChildren } from 'react'

type Props = {
  onClick: () => void
}

export default function BigButton({
  onClick,
  children,
}: PropsWithChildren<Props>) {
  return (
    <button
      role="button"
      aria-label="Play video"
      onClick={onClick}
      className="absolute top-1/2 left-1/2 text-7xl text-black shadow-md  bg-white -translate-x-1/2 -translate-y-1/2 z-20 rounded-full"
    >
      {children}
    </button>
  )
}
