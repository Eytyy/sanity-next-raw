import {
  Artist,
  artistsQuery,
  type Settings,
  settingsQuery,
} from 'lib/sanity.queries'
import { useLiveQuery } from 'next-sanity/preview'

import ArtistsLandingPage, { ArtistsLandingPageProps } from './Landing'

export default function PreviewArtistsLandingPage(
  props: ArtistsLandingPageProps,
) {
  const [artists, loadingArtists] = useLiveQuery<Artist[]>(
    props.artists,
    artistsQuery,
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
      artists={props.artists}
      title={props.title}
    />
  )
}
