import { readToken } from 'lib/sanity.api'
import { getArtworks, getSettings } from 'lib/sanity.client'
import { Artwork, Settings } from 'lib/sanity.queries'
import { GetStaticProps } from 'next'
import type { SharedPageProps } from 'pages/_app'

import ArtworkLandingPage from '@/components/artwork/Landing'
import PreviewArtworkLandingPage from '@/components/artwork/PreviewLanding'
import {
  addBlurDataURLToImage,
  pareseContentImagesBlurDataURL,
} from '@/lib/imageBlurData'

interface PageProps extends SharedPageProps {
  artwork: Artwork[]
  settings: Settings
  title?: string
}

interface Query {
  [key: string]: string
}

export default function ArtworksPage(props: PageProps) {
  const { artwork, settings, draftMode, title } = props

  if (draftMode) {
    return (
      <PreviewArtworkLandingPage
        artwork={artwork}
        settings={settings}
        title={title}
      />
    )
  }

  return (
    <ArtworkLandingPage artwork={artwork} settings={settings} title={title} />
  )
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const { draftMode = false } = ctx
  const token = draftMode ? readToken : undefined

  const [settings, artwork = []] = await Promise.all([
    getSettings(token),
    getArtworks(token),
  ])

  return {
    props: {
      artwork: await pareseContentImagesBlurDataURL(artwork),
      settings,
      draftMode,
      token: token ?? '',
      title: 'Artwork',
    },
  }
}
