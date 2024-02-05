import {
  cn,
  getBackgroundImageWrapperHeight,
  parseImageProps,
} from '@/lib/utils'
import Image from 'next/image'
import React from 'react'
import { ImageProps, MediaLayout } from '../modules/types'

export interface SanityImageProps {
  image: ImageProps
  layout?: MediaLayout
  sizes?: string
  priority?: boolean
  maxWidth?: number
}

export function SanityImage({
  image,
  sizes,
  layout,
  priority,
  maxWidth = 1000,
}: SanityImageProps) {
  const { alt, lqip, ...parseProps } = image
  const imageProps = parseImageProps({
    ...parseProps,
    maxWidth,
    layout,
  })
  return (
    <Image
      className={cn('h-auto w-full object-fill', layout)}
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
  layout,
  priority,
  maxWidth = 1000,
}: SanityImageProps) {
  const { alt, lqip, ...parseProps } = image
  const { src } = parseImageProps({
    ...parseProps,
    maxWidth,
    layout,
  })

  return (
    <div className={cn('relative', getBackgroundImageWrapperHeight(layout))}>
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
