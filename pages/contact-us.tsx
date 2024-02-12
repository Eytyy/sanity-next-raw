import { getSettings } from 'lib/sanity.client'
import { Settings } from 'lib/sanity.queries'
import { GetStaticProps } from 'next'
import type { SharedPageProps } from 'pages/_app'

interface PageProps extends SharedPageProps {
  settings: Settings
}

interface Query {
  [key: string]: string
}

export default function ContactPage(props: PageProps) {
  const { settings } = props
  return (
    <div>
      <h1>Contact PagE</h1>
    </div>
  )
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const { draftMode = false } = ctx

  const [settings] = await Promise.all([getSettings()])

  return {
    props: {
      settings,
      draftMode,
    },
  }
}
