import React from 'react'

import { ImageProps, MediaLayout } from '@/components/modules/types'
import { SanityImageBackground } from '@/components/shared/SanityImage'

export default function VideoPoster({
  image,
  layout,
  maxWidth,
  sizes,
}: {
  image: ImageProps
  layout: MediaLayout
  maxWidth?: number
  sizes?: string
}) {
  return (
    <div className="absolute top-0 left-0 w-full h-full z-20">
      <SanityImageBackground
        sizes={sizes}
        image={image}
        maxWidth={maxWidth}
        layout={layout}
      />
    </div>
  )
}
