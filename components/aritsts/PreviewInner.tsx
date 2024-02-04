import { type Artist, artistBySlugQuery } from 'lib/sanity.queries'
import { useLiveQuery } from 'next-sanity/preview'
import ArtistInnerPage, { ArtistInnerPageProps } from './Inner'

export default function PreviewArtistInnerPage(props: ArtistInnerPageProps) {
  const [artist, loadingArtist] = useLiveQuery<Artist>(
    props.artist,
    artistBySlugQuery,
    {
      slug: props.artist.slug,
    },
  )

  return <ArtistInnerPage preview loading={loadingArtist} artist={artist} />
}
