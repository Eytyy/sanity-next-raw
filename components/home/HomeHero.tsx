import Image from 'next/image'

import { urlForImage } from '@/lib/sanity.image'
import { cn } from '@/lib/utils'

import type { ImageModuleProps, ModuleProps } from '../modules/types'

type HomeHeroProps = {
  variant: 'default' | 'slider' | 'grid'
  content: ModuleProps[]
}

export default function HomeHero(props: HomeHeroProps) {
  return <div className="mb-32">{renderHeroVariant(props)}</div>
}

function renderHeroVariant(props: HomeHeroProps) {
  switch (props.variant) {
    case 'default':
      return <DefaultHero {...props} />
    default:
      return null
  }
}

function DefaultHero(props: HomeHeroProps) {
  const content = props.content[0]
  switch (content._type) {
    case 'module.image':
      return <ImageModule {...content} />
    default:
      return null
  }
}

function ImageModule(props: ImageModuleProps) {
  return (
    <section>
      <div className={cn('shadow-small')}>
        <Image
          className="h-auto w-full"
          width={2000}
          height={1000}
          alt={props.alt}
          src={urlForImage(props.image).height(1000).width(2000).url()}
          sizes="100vw"
          priority
        />
      </div>
    </section>
  )
}
