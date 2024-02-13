import type { Artwork, Settings } from 'lib/sanity.queries'
import { notFound } from 'next/navigation'

import HeadInner from '../shared/HeadInner'
import PageTitle from '../shared/PageTitle'
import ArtworkHeader from './ArtworkHeader'

export interface ArtworkInnerPageProps {
  preview?: boolean
  loading?: boolean
  artwork: Artwork
  settings: Settings
}

export default function ArtworkInnerPage(props: ArtworkInnerPageProps) {
  const { artwork, preview } = props

  const slug = artwork?.slug

  if (!slug && !preview) {
    notFound()
  }

  return (
    <>
      <HeadInner
        title={artwork.title}
        ogImage={artwork.coverImage}
        description={artwork.title}
      />
      {preview && !artwork ? (
        <PageTitle>Loading…</PageTitle>
      ) : (
        <>
          <article>
            <ArtworkHeader
              mainImage={artwork.coverImage}
              title={artwork.title}
              slug={artwork.slug}
            />
          </article>
        </>
      )}
    </>
  )
}
