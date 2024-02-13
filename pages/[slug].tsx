import { getAllPagesSlugs, getPageBySlug, getSettings } from 'lib/sanity.client'
import { Settings } from 'lib/sanity.queries'
import { GetStaticProps } from 'next'
import type { SharedPageProps } from 'pages/_app'

import LandingPageDisplay, { LandingPageProps } from '@/components/page/Landing'
import PreviewLandingPage from '@/components/page/PreviewLanding'
import { pareseModulesImagesBlurDataURL } from '@/lib/imageBlurData'
import { readToken } from '@/lib/sanity.api'

interface PageProps extends SharedPageProps {
  page: LandingPageProps['page']
  settings: Settings
}

interface Query {
  [key: string]: string
}

export default function LandingPage(props: PageProps) {
  const { settings, page, draftMode } = props

  if (draftMode) {
    return <PreviewLandingPage settings={settings} page={page} />
  }

  return <LandingPageDisplay settings={settings} page={page} />
}

export const getStaticPaths = async () => {
  const slugs = await getAllPagesSlugs()
  return {
    paths: slugs?.map(({ slug }) => `/${slug}`) || [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const { draftMode = false, params = {} } = ctx

  const [page, settings] = await Promise.all([
    getPageBySlug(params.slug as string, readToken),
    getSettings(readToken),
  ])

  return {
    props: {
      page: {
        ...page,
        content: await pareseModulesImagesBlurDataURL(page.content),
        hero: {
          ...page.hero,
          content: await pareseModulesImagesBlurDataURL(page.hero.content),
        },
      },
      settings,
      draftMode,
      token: draftMode ? readToken : '',
      title: page.title,
    },
  }
}
