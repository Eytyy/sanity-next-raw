import { cn, parseImageProps } from '@/lib/utils'
import Image from 'next/image'

export default function BodyImage({
  image,
  alt,
  caption,
}: {
  alt: string
  caption?: string
  image: {
    hotspot?: { x: number; y: number }
    crop?: any
    height: number
    width: number
    _id: string
    lqip: string
  }
}) {
  const { _id, hotspot, crop, width, height, lqip } = image
  const imageProps = parseImageProps({
    _id,
    width,
    height,
    hotspot,
    crop,
    maxWidth: 1000,
  })

  return (
    <figure>
      <Image
        className={cn('h-auto w-full object-fill')}
        alt={alt ?? 'untitled'}
        {...imageProps}
        sizes={'100vw'}
        blurDataURL={lqip}
        placeholder="blur"
      />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}
