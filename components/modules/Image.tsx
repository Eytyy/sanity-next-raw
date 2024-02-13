import React from 'react'

import { cn } from '@/lib/utils'

import { SanityImage, SanityImageBackground } from '../shared/SanityImage'
import { ImageModuleProps } from './types'

export default function ImageModule({
  image,
  alt,
  mediaConfig,
}: ImageModuleProps) {
  const { background, maxWidth, objectFit, layout, sizes } = mediaConfig
  return background ? (
    <SanityImageBackground
      maxWidth={maxWidth}
      layout={layout}
      sizes={sizes}
      image={{ ...image, alt }}
      className={cn(
        objectFit === 'contain' ? 'object-contain' : 'object-cover',
      )}
    />
  ) : (
    <SanityImage
      maxWidth={maxWidth}
      layout={layout}
      sizes={sizes}
      image={{
        ...image,
        alt,
      }}
    />
  )
}
