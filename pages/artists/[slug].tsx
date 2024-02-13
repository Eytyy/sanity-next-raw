import { readToken } from 'lib/sanity.api'
import {
  getAllArtistSlugs,
  getArtistBySlug,
  getSettings,
} from 'lib/sanity.client'
import { Artist, Settings } from 'lib/sanity.queries'
import { GetStaticProps } from 'next'
import type { SharedPageProps } from 'pages/_app'

import ArtistInnerPage from '@/components/aritsts/Inner'
import PreviewArtistInnerPage from '@/components/aritsts/PreviewInner'
import InnerLayout from '@/components/layout/InnerLayout'
import { addBlurDataURLToImage } from '@/lib/imageBlurData'

interface PageProps extends SharedPageProps {
  artist: Artist
  settings?: Settings
}

interface Query {
  [key: string]: string
}

export default function ArtworkSlugRoute(props: PageProps) {
  const { artist, draftMode } = props

  if (draftMode) {
    return <PreviewArtistInnerPage artist={artist} />
  }
  return <ArtistInnerPage artist={artist} />
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const { draftMode = false, params = {} } = ctx

  const [settings, artist] = await Promise.all([
    getSettings(readToken),
    getArtistBySlug(params.slug, readToken),
  ])

  if (!artist) {
    return {
      notFound: true,
    }
  }

  const artistkWithBlurData = {
    ...artist,
    coverImage: await addBlurDataURLToImage(artist.coverImage),
  }

  return {
    props: {
      artist: artistkWithBlurData,
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

ArtworkSlugRoute.getLayout = function getLayout(page: React.ReactElement) {
  return <InnerLayout {...page.props}>{page}</InnerLayout>
}
