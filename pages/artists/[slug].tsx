import ArtistInnerPage from '@/components/aritsts/Inner'
import PreviewArtistInnerPage from '@/components/aritsts/PreviewInner'
import { readToken } from 'lib/sanity.api'
import {
  getAllArtistSlugs,
  getArtistBySlug,
  getSettings,
} from 'lib/sanity.client'
import { Artist, Settings } from 'lib/sanity.queries'
import { GetStaticProps } from 'next'
import type { SharedPageProps } from 'pages/_app'

interface PageProps extends SharedPageProps {
  artist: Artist
  settings?: Settings
}

interface Query {
  [key: string]: string
}

export default function ArtworkSlugRoute(props: PageProps) {
  const { artist, settings, draftMode } = props

  if (draftMode) {
    return <PreviewArtistInnerPage artist={artist} settings={settings} />
  }
  return <ArtistInnerPage artist={artist} settings={settings} />
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const { draftMode = false, params = {} } = ctx

  const [settings, artist] = await Promise.all([
    getSettings(readToken),
    getArtistBySlug(readToken, params.slug),
  ])

  if (!artist) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      artist,
      settings,
      draftMode,
      token: draftMode ? readToken : '',
      pageTitle: artist.name,
    },
  }
}

export const getStaticPaths = async () => {
  const slugs = await getAllArtistSlugs()
  return {
    paths: slugs?.map(({ slug }) => `/artists/${slug}`) || [],
    fallback: 'blocking',
  }
}
