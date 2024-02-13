import IndexPage, { IndexPageProps } from 'components/home/IndexPage'
import PreviewIndexPage from 'components/home/PreviewIndexPage'
import { readToken } from 'lib/sanity.api'
import { getHome, getSettings } from 'lib/sanity.client'
import { Settings } from 'lib/sanity.queries'
import { GetStaticProps } from 'next'
import type { SharedPageProps } from 'pages/_app'

import { pareseModulesImagesBlurDataURL } from '@/lib/imageBlurData'

interface PageProps extends SharedPageProps {
  page: IndexPageProps['page']
  settings: Settings
}

interface Query {
  [key: string]: string
}

export default function HomePage(props: PageProps) {
  const { page, settings, draftMode } = props
  if (draftMode) {
    return <PreviewIndexPage page={page} settings={settings} />
  }

  return <IndexPage page={page} settings={settings} />
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const { draftMode = false } = ctx
  const token = draftMode ? readToken : undefined

  const [settings, page] = await Promise.all([
    getSettings(token),
    getHome(token),
  ])

  return {
    props: {
      page: {
        ...page,
        content: await pareseModulesImagesBlurDataURL(page.content),
      },
      settings,
      draftMode,
      token: token ?? '',
    },
  }
}
