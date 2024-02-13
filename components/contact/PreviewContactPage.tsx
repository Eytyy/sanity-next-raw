import { contactQuery, type Settings, settingsQuery } from 'lib/sanity.queries'
import { useLiveQuery } from 'next-sanity/preview'

import ContactPageDisplay, { ContactPageProps } from './ContactPageDisplay'

export default function PreviewContactPage(props: ContactPageProps) {
  const [page, loadingPage] = useLiveQuery<ContactPageProps['page']>(
    props.page,
    contactQuery,
  )
  const [settings, loadingSettings] = useLiveQuery<Settings>(
    props.settings,
    settingsQuery,
  )

  return (
    <ContactPageDisplay
      preview
      loading={loadingPage || loadingSettings}
      page={page}
      settings={settings || {}}
    />
  )
}
