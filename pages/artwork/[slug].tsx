import ArtworkInnerPage from '@/components/artwork/Inner'
import PreviewArtworkInnerPage from '@/components/artwork/PreviewInner'
import { readToken } from 'lib/sanity.api'
import {
  getAllArtworkSlugs,
  getAllPostsSlugs,
  getArtworkBySlug,
  getClient,
  getSettings,
} from 'lib/sanity.client'
import { Artwork, Settings } from 'lib/sanity.queries'
import { GetStaticProps } from 'next'
import type { SharedPageProps } from 'pages/_app'

interface PageProps extends SharedPageProps {
  artwork: Artwork
  settings?: Settings
}

interface Query {
  [key: string]: string
}

export default function ArtworkSlugRoute(props: PageProps) {
  const { settings, artwork, draftMode } = props

  if (draftMode) {
    return <PreviewArtworkInnerPage artwork={artwork} settings={settings} />
  }

  return <ArtworkInnerPage artwork={artwork} settings={settings} />
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const { draftMode = false, params = {} } = ctx
  const client = getClient(draftMode ? { token: readToken } : undefined)

  const [settings, artwork] = await Promise.all([
    getSettings(readToken),
    getArtworkBySlug(readToken, params.slug),
  ])

  if (!artwork) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      artwork,
      settings,
      draftMode,
      token: draftMode ? readToken : '',
      pageTitle: artwork.title,
    },
  }
}

export const getStaticPaths = async () => {
  const slugs = await getAllArtworkSlugs()

  return {
    paths: slugs?.map(({ slug }) => `/artwork/${slug}`) || [],
    fallback: 'blocking',
  }
}
