import Link from 'next/link'
import React, { MouseEvent, PropsWithChildren } from 'react'

import { cn } from '@/lib/utils'

type Props = {
  onClick: () => void
  label: string
  isActive?: boolean
  className?: string
}

export default function Pill({
  onClick,
  isActive,
  label,
  children,
  className,
}: PropsWithChildren<Props>) {
  return (
    <button
      className={cn(
        'px-8 py-2 rounded-full transition-colors duration-200 ease-in-out bg-white/90 text-black border hover:border-black',
        isActive &&
          'bg-black/90 text-white border hover:bg-white hover:border-black hover:text-black active',
        className,
      )}
      role="button"
      aria-label={label}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

type PillLinkProps = {
  onClick: (e: MouseEvent<HTMLAnchorElement>) => void
  label: string
  isActive?: boolean
  className?: string
  href: string
}

export function PillLink({
  onClick,
  isActive,
  label,
  children,
  href,
  className,
}: PropsWithChildren<PillLinkProps>) {
  return (
    <Link
      className={cn(
        isActive
          ? 'bg-black/90 text-white border hover:bg-white hover:border-black hover:text-black'
          : 'bg-white/90 text-black border hover:border-black',
        'px-8 py-2 rounded-full transition-colors duration-200 ease-in-out',
        className,
      )}
      href={href}
      title={label}
      onClick={onClick}
    >
      {children}
    </Link>
  )
}
