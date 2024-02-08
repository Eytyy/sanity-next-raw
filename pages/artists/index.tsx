import { readToken } from 'lib/sanity.api'
import { getArtists, getSettings } from 'lib/sanity.client'
import { Artist, Settings } from 'lib/sanity.queries'
import { GetStaticProps } from 'next'
import type { SharedPageProps } from 'pages/_app'

import ArtistsLandingPage from '@/components/aritsts/Landing'
import PreviewArtistsLandingPage from '@/components/aritsts/PreviewLanding'
import { pareseContentImagesBlurDataURL } from '@/lib/imageBlurData'

interface PageProps extends SharedPageProps {
  settings: Settings
  artists: Artist[]
  title?: string
}

interface Query {
  [key: string]: string
}

export default function ArtworkPage(props: PageProps) {
  const { artists, title, settings, draftMode } = props

  if (draftMode) {
    return (
      <PreviewArtistsLandingPage
        artists={artists}
        title={title}
        settings={settings}
      />
    )
  }

  return (
    <ArtistsLandingPage artists={artists} title={title} settings={settings} />
  )
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const { draftMode = false } = ctx
  const token = draftMode ? readToken : undefined

  const [settings, artists = []] = await Promise.all([
    getSettings(token),
    getArtists(token),
  ])

  return {
    props: {
      artists: await pareseContentImagesBlurDataURL(artists),
      title: 'Artists',
      settings,
      draftMode,
      token: token ?? '',
    },
  }
}
