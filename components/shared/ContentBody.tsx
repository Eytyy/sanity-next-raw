import {
  PortableText,
  type PortableTextReactComponents,
} from '@portabletext/react'

import { cn } from '@/lib/utils'

import { SanityImage } from './SanityImage'

const myPortableTextComponents: Partial<PortableTextReactComponents> = {
  types: {
    image: ({ value }) => {
      return <SanityImage {...value} />
    },
  },
}

export default function ContentBody({
  content,
  className,
}: {
  content: any
  className?: string
}) {
  return (
    <div className={cn(`mx-auto max-w-2xl`, className)}>
      <PortableText value={content} components={myPortableTextComponents} />
    </div>
  )
}
