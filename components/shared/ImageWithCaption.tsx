import { cn } from '@/lib/utils'

import { ImageProps } from '../modules/types'
import { SanityImage } from './SanityImage'

export default function ImageWithCaption({
  image,
  caption,
}: {
  caption?: string
  image: ImageProps
}) {
  return (
    <figure>
      <SanityImage className={cn('h-auto w-full object-fill')} image={image} />
      {caption && (
        <figcaption className="text-xs leading-tight mt-4">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
