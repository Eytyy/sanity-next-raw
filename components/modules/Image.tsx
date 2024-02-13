import React from 'react'

import { cn } from '@/lib/utils'

import { SanityImage, SanityImageBackground } from '../shared/SanityImage'
import { ImageModuleProps } from './types'

export default function ImageModule({
  image,
  alt,
  mediaConfig,
}: ImageModuleProps) {
  return mediaConfig?.background ? (
    <SanityImageBackground
      className={cn(
        mediaConfig?.objectFit === 'contain'
          ? 'object-contain'
          : 'object-cover',
      )}
      image={{ ...image, alt }}
      {...mediaConfig}
    />
  ) : (
    <SanityImage image={{ ...image, alt }} {...mediaConfig} />
  )
}
