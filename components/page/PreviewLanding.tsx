import {
  pageBySlugQuery,
  type Settings,
  settingsQuery,
} from 'lib/sanity.queries'
import { useLiveQuery } from 'next-sanity/preview'

import LandingPage, { LandingPageProps } from './Landing'

export default function PreviewLandingPage(props: LandingPageProps) {
  const [page, loadingPage] = useLiveQuery<LandingPageProps['page']>(
    props.page,
    pageBySlugQuery,
    {
      slug: props.page.slug,
    },
  )
  const [settings, loadingSettings] = useLiveQuery<Settings>(
    props.settings,
    settingsQuery,
  )

  return (
    <LandingPage
      preview
      loading={loadingPage || loadingSettings}
      settings={settings || {}}
      page={page}
    />
  )
}
