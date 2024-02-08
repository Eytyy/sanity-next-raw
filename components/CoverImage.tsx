import cn from 'classnames'
import Link from 'next/link'

import { ImageProps, MediaLayout } from './modules/types'
import { SanityImage } from './shared/SanityImage'

interface CoverImageProps {
  title: string
  image: ImageProps
  maxWidth?: number
  priority?: boolean
  sizes?: string
  layout?: MediaLayout
  linkVariant?: 'internal' | 'external'
  slug?: string
}

export default function CoverImage(props: CoverImageProps) {
  const {
    title,
    slug,
    image: source,
    priority,
    linkVariant,
    sizes,
    layout,
    maxWidth,
  } = props
  const internalLink = linkVariant ? linkVariant === 'internal' : true
  const image = source?._id ? (
    <div
      className={cn('shadow-small', {
        'transition-shadow duration-200 hover:shadow-medium': slug,
      })}
    >
      <SanityImage
        image={source}
        sizes={sizes ?? '100vw'}
        layout={layout}
        priority={priority}
        maxWidth={maxWidth}
      />
    </div>
  ) : (
    <div style={{ paddingTop: '50%', backgroundColor: '#ddd' }} />
  )

  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link
          href={slug}
          aria-label={title}
          target={internalLink ? undefined : '_blank'}
          rel={internalLink ? undefined : 'noopener noreferrer'}
        >
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  )
}
