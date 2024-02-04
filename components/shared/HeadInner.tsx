import Head from 'next/head'
import Meta from './Meta'
import { urlForImage } from '@/lib/sanity.image'

export interface HeadInnerProps {
  title: string
  description?: string
  ogImage: any
}

export default function HeadInner({
  title,
  description,
  ogImage,
}: HeadInnerProps) {
  const ogImageSrc = urlForImage(ogImage).height(630).width(1200).url()

  return (
    <Head>
      <title>{title}</title>
      <Meta />
      {description && (
        <meta
          key="description"
          name="description"
          content={description.slice(0, 160)}
        />
      )}
      <meta property="og:image" content={ogImageSrc} />
    </Head>
  )
}
