import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

import { cn } from '@/lib/utils'

type Props = {}

const links = [
  { href: '/', label: 'Home', _id: 'home' },
  { href: '/artists', label: 'Artists', _id: 'artists' },
  { href: '/artwork', label: 'Artwork', _id: 'artwork' },
  { href: '/blog', label: 'Blog', _id: 'blog' },
]
export default function Navigation({}: Props) {
  return (
    <nav className="flex gap-10">
      {links.map(({ href, label, _id }) => (
        <NavPageLink href={href} key={_id} label={label} />
      ))}
    </nav>
  )
}

function NavPageLink({ href, label }: { href: string; label: string }) {
  const router = useRouter()
  const basePath = router.pathname.split('/')[1]
  const isCurrent = basePath === href.split('/')[1]
  return (
    <Link
      className={cn(
        `border-transparent hover:border-black border-b-2`,
        isCurrent && 'font-bold',
      )}
      href={href}
    >
      {label}
    </Link>
  )
}
