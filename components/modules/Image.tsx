import React from 'react'

import { SanityImage } from '../shared/SanityImage'
import { ImageModuleProps } from './types'

export default function ImageModule({ image, alt }: ImageModuleProps) {
  return (
    <SanityImage
      image={{
        ...image,
        alt,
      }}
    />
  )
}
