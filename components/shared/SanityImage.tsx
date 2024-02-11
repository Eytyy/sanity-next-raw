import Image from 'next/image'
import React from 'react'

import {
  cn,
  getBackgroundImageWrapperHeight,
  parseImageProps,
} from '@/lib/utils'

import { ImageProps, MediaLayout } from '../modules/types'

export interface SanityImageProps {
  image: ImageProps
  layout?: MediaLayout
  sizes?: string
  priority?: boolean
  maxWidth?: number
  className?: string
}

export function SanityImage({
  image,
  sizes,
  layout,
  priority,
  maxWidth = 1000,
  className,
}: SanityImageProps) {
  const { alt, blurDataURL, ...parseProps } = image
  const { src, width, height } = parseImageProps({
    ...parseProps,
    maxWidth,
    layout,
  })

  return (
    <Image
      className={cn('h-auto w-full object-fill', layout, className)}
      alt={alt ?? 'untitled'}
      src={src}
      width={width}
      height={height}
      sizes={sizes ?? '100vw'}
      priority={priority}
      placeholder={blurDataURL ? 'blur' : 'empty'}
      blurDataURL={blurDataURL ? blurDataURL : undefined}
    />
  )
}

export function SanityImageBackground({
  image,
  sizes,
  layout,
  priority,
  maxWidth = 1000,
  className,
}: SanityImageProps) {
  const { alt, blurDataURL, ...parseProps } = image
  const { src } = parseImageProps({
    ...parseProps,
    maxWidth,
    layout,
  })

  return (
    <div className={cn('relative', getBackgroundImageWrapperHeight(layout))}>
      <Image
        className={
          (cn('h-full w-full object-fill absolute top-0 left-0'), className)
        }
        fill={true}
        alt={alt ?? 'untitled'}
        src={src}
        sizes={sizes ?? '100vw'}
        priority={priority}
        placeholder={blurDataURL ? 'blur' : 'empty'}
        blurDataURL={blurDataURL ? blurDataURL : undefined}
      />
    </div>
  )
}
