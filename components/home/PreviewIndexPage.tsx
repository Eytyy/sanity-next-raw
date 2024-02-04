import {
  indexQuery,
  type Post,
  type Settings,
  settingsQuery,
} from 'lib/sanity.queries'
import { useLiveQuery } from 'next-sanity/preview'

import IndexPage, { type IndexPageProps } from './IndexPage'

export default function PreviewIndexPage(props: IndexPageProps) {
  const [page, loadingPage] = useLiveQuery<IndexPageProps['page']>(
    props.page,
    indexQuery,
  )
  const [settings, loadingSettings] = useLiveQuery<Settings>(
    props.settings,
    settingsQuery,
  )

  return (
    <IndexPage
      preview
      loading={loadingPage || loadingSettings}
      page={page}
      settings={settings || {}}
    />
  )
}
