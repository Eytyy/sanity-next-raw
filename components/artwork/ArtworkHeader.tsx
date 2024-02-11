import type { InternalPost } from 'lib/sanity.queries'

import { MediaLayout } from '../modules/types'
import PageTitle from '../shared/PageTitle'
import { SanityImageBackground } from '../shared/SanityImage'

export default function ArtworkHeader(props: {
  title: string
  mainImage: InternalPost['coverImage']
  slug: string
  layout?: MediaLayout
  background?: boolean
}) {
  const { title, mainImage, layout } = props
  return (
    <>
      <PageTitle>{title}</PageTitle>
      <div className="mb-8 sm:mx-0 md:mb-16">
        <SanityImageBackground
          image={mainImage}
          layout={layout}
          priority={true}
          maxWidth={2000}
          className="object-contain"
        />
      </div>
    </>
  )
}
