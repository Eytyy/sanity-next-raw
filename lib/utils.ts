import { SanityImageProps } from '@/components/shared/SanityImage'
import clsx, { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { urlForImage } from './sanity.image'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getBackgroundImageWrapperHeight = (
  format: 'portrait' | 'square' | 'vertical',
) => {
  switch (format) {
    case 'portrait':
      return 'pt-[150%]'
    case 'square':
      return 'pt-[100%]'
    case 'vertical':
      return 'pt-[177%]'
    default:
      return 'pt-[56.25%]'
  }
}

export const getImageDimensions = (
  width: number,
  height: number,
  maxWidth: number,
) => {
  const ratio = width / height
  const newWidth = Math.min(width, maxWidth)
  const newHeight = Math.floor(newWidth / ratio)
  return { width: newWidth, height: newHeight }
}

export const getImageHeight = (
  width: number = 1000,
  format?: SanityImageProps['format'],
) => {
  switch (format) {
    case 'square':
      return width // 1:1
    case 'portrait':
      return Math.floor(width * 1.3333) // 3:4
    case 'landscape':
      return Math.floor(width * 0.5625) // 16:9
  }
}

interface Props {
  _id: string
  width: number
  height: number
  maxWidth: number
  format?: SanityImageProps['format']
  crop?: SanityImageProps['image']['crop']
  hotspot?: SanityImageProps['image']['hotspot']
}

export const parseImageProps = ({
  _id,
  width: imageWidth,
  height: imageHeight,
  maxWidth,
  format,
  crop,
  hotspot,
}: Props) => {
  let dimensions: { height: number; width: number } = {
    height: imageWidth,
    width: imageHeight,
  }
  if (format) {
    // if format is provided, calculate the height based on the aspect ratio
    const { width } = getImageDimensions(
      imageWidth,
      imageHeight,
      Math.min(maxWidth, imageWidth),
    )
    const height = getImageHeight(width, format)
    dimensions.height = height
    dimensions.width = width
  } else {
    // if no format is provided, calculate the dimensions based on maxWidth and the image's aspect ratio
    const { width, height } = getImageDimensions(
      imageWidth,
      imageHeight,
      maxWidth,
    )
    dimensions = { width, height }
  }
  const { width, height } = dimensions

  if (crop && hotspot) {
    return {
      src: urlForImage(_id)
        .width(width)
        .height(height)
        .focalPoint(hotspot.x, hotspot.y)
        .fit('crop')
        .crop('focalpoint')
        .url(),
      ...dimensions,
    }
  }
  return {
    src: urlForImage(_id).width(width).height(height).url(),
    ...dimensions,
  }
}
