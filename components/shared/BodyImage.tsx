import Image from 'next/image'

import { cn, parseImageProps } from '@/lib/utils'

import { ImageProps } from '../modules/types'

export default function BodyImage({
  image,
  alt,
  caption,
}: {
  alt: string
  caption?: string
  image: ImageProps
}) {
  const { blurDataURL, ...parseProps } = image
  const imageProps = parseImageProps({
    ...parseProps,
    maxWidth: 1000,
  })

  return (
    <figure>
      <Image
        className={cn('h-auto w-full object-fill')}
        alt={alt ?? 'untitled'}
        {...imageProps}
        sizes={'100vw'}
        blurDataURL={blurDataURL}
        placeholder="blur"
      />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}
