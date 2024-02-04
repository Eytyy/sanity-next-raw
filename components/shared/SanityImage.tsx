import { urlForImage } from '@/lib/sanity.image'
import { ImageProps } from '@/lib/sanity.queries'

import {
  cn,
  getBackgroundImageWrapperHeight,
  parseImageProps,
} from '@/lib/utils'
import Image from 'next/image'
import React from 'react'

export interface SanityImageProps {
  image: ImageProps
  format?: 'portrait' | 'square' | 'landscape'
  sizes?: string
  priority?: boolean
  maxWidth?: number
}

export function SanityImage({
  image,
  sizes,
  format,
  priority,
  maxWidth = 1000,
}: SanityImageProps) {
  const { alt, lqip, ...parseProps } = image
  const imageProps = parseImageProps({
    ...parseProps,
    maxWidth,
    format,
  })
  return (
    <Image
      className={cn('h-auto w-full object-fill', format)}
      alt={alt ?? 'untitled'}
      {...imageProps}
      sizes={sizes ?? '100vw'}
      priority={priority}
      blurDataURL={lqip}
      placeholder="blur"
    />
  )
}

export function SanityImageBackground({
  image,
  sizes,
  format,
  priority,
  maxWidth = 1000,
}: SanityImageProps) {
  const { alt, lqip, ...parseProps } = image
  const { src } = parseImageProps({
    ...parseProps,
    maxWidth,
    format,
  })

  return (
    <div
      className={cn('relative h-0', getBackgroundImageWrapperHeight(format))}
    >
      <Image
        className="h-full w-full object-fill absolute top-0 left-0"
        layout="fill"
        alt={alt ?? 'untitled'}
        src={src}
        sizes={sizes ?? '100vw'}
        priority={priority}
        blurDataURL={lqip}
        placeholder="blur"
      />
    </div>
  )
}
