import Link from 'next/link'
import { useRouter } from 'next/router'

import { cn } from '@/lib/utils'

export type InternalLinkProps = {
  href: string
  title: string
  _key: string
  _type: 'linkInternal' | 'linkContent'
}

export default function InternalLink({ href, title }: InternalLinkProps) {
  const router = useRouter()
  const basePath = router.pathname.split('/')[1]
  const isCurrent = basePath === href
  return (
    <Link
      className={cn(
        `border-transparent hover:border-black border-b-2`,
        isCurrent && 'font-bold',
      )}
      href={`/${href}`}
    >
      {title}
    </Link>
  )
}
