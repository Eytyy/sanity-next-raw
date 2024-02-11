import type { Artist, Settings } from 'lib/sanity.queries'
import { notFound } from 'next/navigation'

import ContentBody from '../shared/ContentBody'
import ContentHeader from '../shared/ContentHeader'
import HeadInner from '../shared/HeadInner'
import PageTitle from '../shared/PageTitle'

export interface ArtistInnerPageProps {
  preview?: boolean
  loading?: boolean
  artist: Artist
}

export default function ArtistInnerPage(props: ArtistInnerPageProps) {
  const { artist, preview } = props

  const slug = artist?.slug

  if (!slug && !preview) {
    notFound()
  }

  return (
    <>
      <HeadInner {...artist.meta} />
      {preview && !artist ? (
        <PageTitle>Loading…</PageTitle>
      ) : (
        <>
          <article>
            <ContentHeader
              coverImage={artist.coverImage}
              title={artist.name}
              slug={artist.slug}
              layout="landscape"
            />
            <ContentBody content={artist.bio} />
          </article>
        </>
      )}
    </>
  )
}
