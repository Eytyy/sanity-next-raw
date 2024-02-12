import Link from 'next/link'

import { cn } from '@/lib/utils'

export type ExternalLinkProps = {
  href: string
  title: string
  _key: string
  _type: 'linkExternal'
}

export default function ExternalLink({ href, title }: ExternalLinkProps) {
  return (
    <Link
      target="_blank"
      rel="noopener noreferrer"
      className={cn(`border-transparent hover:border-black border-b-2`)}
      href={href}
    >
      {title}
    </Link>
  )
}
