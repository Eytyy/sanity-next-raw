import {
  type Settings,
  settingsQuery,
  Artwork,
  artworkQuery,
} from 'lib/sanity.queries'
import { useLiveQuery } from 'next-sanity/preview'

import ArtistsLandingPage, { ArtworkLandingPageProps } from './Landing'

export default function PreviewArtworkLandingPage(
  props: ArtworkLandingPageProps,
) {
  const [artwork, loadingArtists] = useLiveQuery<Artwork[]>(
    props.artwork,
    artworkQuery,
  )
  const [settings, loadingSettings] = useLiveQuery<Settings>(
    props.settings,
    settingsQuery,
  )

  return (
    <ArtistsLandingPage
      preview
      loading={loadingArtists || loadingSettings}
      settings={settings || {}}
      artwork={props.artwork}
      title={props.title}
    />
  )
}
