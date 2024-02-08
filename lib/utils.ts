import clsx, { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

import { MediaLayout } from '@/components/modules/types'
import { SanityImageProps } from '@/components/shared/SanityImage'

import { urlForImage } from './sanity.image'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getPositionFromHotspot(
  hotspot: SanityImageProps['image']['hotspot'],
) {
  if (!hotspot || !hotspot.x || !hotspot.y) return 'center'

  return `${hotspot.x * 100}% ${hotspot.y * 100}%`
}

export const getBackgroundImageWrapperHeight = (layout: MediaLayout) => {
  switch (layout) {
    case 'portrait':
      return 'aspect-portrait'
    case 'square':
      return 'aspect-square'
    case 'landscape':
    default:
      return 'aspect-video'
  }
}

export const getScaledImageDimensions = (
  width: number,
  height: number,
  maxWidth: number,
) => {
  const ratio = width / height
  const newWidth = Math.min(width, maxWidth)
  const newHeight = Math.floor(newWidth / ratio)
  return [newWidth, newHeight]
}

export const getImageArtDirection = (
  width: number = 1000,
  layout?: SanityImageProps['layout'],
) => {
  switch (layout) {
    case 'square':
      return [width, width] // 1:1
    case 'portrait':
      return [width, Math.floor(width * 1.3333)] // 3:4
    case 'landscape':
    default:
      return [width, Math.floor(width * 0.5625)] // 16:9
  }
}

// Calculate crop dimensions in pixels
export const getCroppedImageDimensions = ({
  width,
  height,
  crop,
}: {
  width: number
  height: number
  crop: SanityImageProps['image']['crop']
}) => {
  const cropLeft = Math.round(width * crop.left)
  const cropRight = Math.round(width * crop.right)
  const cropTop = Math.round(height * crop.top)
  const cropBottom = Math.round(height * crop.bottom)
  const croppedWidth = width - cropLeft - cropRight
  const croppedHeight = height - cropTop - cropBottom

  return { croppedWidth, croppedHeight, cropLeft, cropTop }
}

interface Props {
  _id: string
  width: number
  height: number
  maxWidth?: number
  layout?: SanityImageProps['layout']
  crop?: SanityImageProps['image']['crop']
  hotspot?: SanityImageProps['image']['hotspot']
}

export const parseImageProps = ({
  _id,
  width: originalWidth,
  height: originalHeight,
  maxWidth,
  layout,
  crop,
  hotspot,
}: Props) => {
  if (crop) {
    const { cropLeft, cropTop, croppedHeight, croppedWidth } =
      getCroppedImageDimensions({
        width: originalWidth,
        height: originalHeight,
        crop,
      })
    const [scaledWidth, scaledHeight] = getScaledImageDimensions(
      croppedWidth,
      croppedHeight,
      maxWidth,
    )

    const [width, height] = layout
      ? getImageArtDirection(scaledWidth, layout)
      : [scaledWidth, scaledHeight]

    let src = urlForImage(_id)
      .width(width)
      .height(height)
      .rect(cropLeft, cropTop, croppedWidth, croppedHeight)

    const [blurScaledWidth, blurScaledHeight] = getScaledImageDimensions(
      croppedWidth,
      croppedHeight,
      25,
    )

    const [blurWidth, blurHeight] = layout
      ? getImageArtDirection(blurScaledWidth, layout)
      : [blurScaledWidth, blurScaledHeight]

    let blurSrc = urlForImage(_id)
      .width(blurWidth)
      .height(blurHeight)
      .rect(cropLeft, cropTop, croppedWidth, croppedHeight)

    if (hotspot) {
      src = src.focalPoint(hotspot.x, hotspot.y).fit('crop').crop('focalpoint')
      blurSrc = blurSrc
        .focalPoint(hotspot.x, hotspot.y)
        .fit('crop')
        .crop('focalpoint')
    }
    return {
      src: src.url(),
      blurSrc: blurSrc.url(),
      width,
      height,
    }
  } else {
    const [scaledWidth, scaledHeight] = getScaledImageDimensions(
      originalWidth,
      originalHeight,
      maxWidth,
    )

    const [blurScaledWidth, blurScaledHeight] = getScaledImageDimensions(
      originalWidth,
      originalHeight,
      25,
    )

    const [width, height] = layout
      ? getImageArtDirection(scaledWidth, layout)
      : [scaledWidth, scaledHeight]

    const [blurWidth, blurHeight] = layout
      ? getImageArtDirection(blurScaledWidth, layout)
      : [blurScaledWidth, blurScaledHeight]
    let src = urlForImage(_id).width(width).height(height)
    let blurSrc = urlForImage(_id).width(blurWidth).height(blurHeight)
    if (hotspot) {
      src = src.focalPoint(hotspot.x, hotspot.y).fit('crop').crop('focalpoint')
      blurSrc = blurSrc
        .focalPoint(hotspot.x, hotspot.y)
        .fit('crop')
        .crop('focalpoint')
    }
    return {
      src: src.url(),
      blurSrc: blurSrc.url(),
      width,
      height,
    }
  }
}
