import CoverImage from 'components/CoverImage'
import type { InternalPost } from 'lib/sanity.queries'

import PageTitle from './PageTitle'

export default function ContentHeader(props: {
  title: string
  coverImage: InternalPost['coverImage']
  slug: string
  format?: 'landscape' | 'portrait' | 'square'
}) {
  const { title, coverImage, slug, format } = props
  return (
    <>
      <PageTitle>{title}</PageTitle>
      <div className="mb-8 sm:mx-0 md:mb-16">
        <CoverImage
          title={title}
          image={coverImage}
          priority
          maxWidth={2000}
          sizes="100vw"
          format={format}
        />
      </div>
    </>
  )
}
