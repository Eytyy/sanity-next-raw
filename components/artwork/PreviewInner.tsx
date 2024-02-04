import {
  type Settings,
  settingsQuery,
  artworkBySlugQuery,
  type Artwork,
} from 'lib/sanity.queries'
import { useLiveQuery } from 'next-sanity/preview'

import ArtworkInnerPage, { ArtworkInnerPageProps } from './Inner'

export default function PreviewArtworkInnerPage(props: ArtworkInnerPageProps) {
  const [artwork, loadingArtist] = useLiveQuery<Artwork>(
    props.artwork,
    artworkBySlugQuery,
    {
      slug: props.artwork.slug,
    },
  )

  const [settings, loadingSettings] = useLiveQuery<Settings>(
    props.settings,
    settingsQuery,
  )

  return (
    <ArtworkInnerPage
      preview
      loading={loadingArtist || loadingSettings}
      artwork={artwork}
      settings={settings || {}}
    />
  )
}
