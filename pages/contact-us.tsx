import { getContact, getSettings } from 'lib/sanity.client'
import { GetStaticProps } from 'next'

import ContactPageDisplay, {
  ContactPageProps,
} from '@/components/contact/ContactPageDisplay'
import PreviewContactPage from '@/components/contact/PreviewContactPage'
import { readToken } from '@/lib/sanity.api'
import { Settings } from '@/lib/sanity.queries'

import { SharedPageProps } from './_app'

interface PageProps extends SharedPageProps {
  page: ContactPageProps['page']
  settings: Settings
}

interface Query {
  [key: string]: string
}

export default function ContactPage(props: PageProps) {
  const { page, settings, draftMode } = props
  if (draftMode) {
    return <PreviewContactPage page={page} settings={settings} />
  }
  return <ContactPageDisplay page={page} settings={settings} />
}

export const getStaticProps: GetStaticProps<ContactPageProps, Query> = async (
  ctx,
) => {
  const { draftMode = false } = ctx
  const token = draftMode ? readToken : undefined

  const [page, settings] = await Promise.all([
    getContact(readToken),
    getSettings(),
  ])

  return {
    props: {
      page: {
        ...page,
        form: {
          ...page.form,
          fields: {
            ...page.form.fields,
            customFields: page.form.fields.customFields.map((field, index) => {
              return {
                ...field,
                name: `customField${index}`,
              }
            }),
          },
        },
      },
      settings,
      draftMode,
      token: token ?? '',
      title: page.title || '',
    },
  }
}
