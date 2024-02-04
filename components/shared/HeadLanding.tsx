import { toPlainText } from '@portabletext/react'
import { Settings } from 'lib/sanity.queries'
import Head from 'next/head'
import Meta from './Meta'
import { urlForImage } from '@/lib/sanity.image'

export interface HeadLandingProps {
  settings: Settings
  title?: string
}

export default function HeadLanding({ settings, title }: HeadLandingProps) {
  const { title: siteTitle, description, ogImage } = settings
  const ogImageSrc = urlForImage(ogImage).height(630).width(1200).url()

  return (
    <Head>
      <title>{title || siteTitle}</title>
      <Meta />
      <meta
        key="description"
        name="description"
        content={toPlainText(description)}
      />
      <meta property="og:image" content={ogImageSrc} />
    </Head>
  )
}
