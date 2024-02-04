import 'tailwindcss/tailwind.css'

import { NextPage } from 'next'
import { AppProps } from 'next/app'
import { lazy, Suspense } from 'react'

import Layout from '@/components/shared/Layout'

export interface SharedPageProps {
  draftMode: boolean
  token: string
  title?: string
}

const PreviewProvider = lazy(() => import('components/PreviewProvider'))
const VisualEditing = lazy(() => import('components/VisualEditing'))

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
  draftMode: boolean
  token: string
}

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const { draftMode, token } = pageProps
  const getLayout =
    Component.getLayout || ((page) => <Layout {...pageProps}>{page}</Layout>)

  return (
    <>
      {draftMode ? (
        <PreviewProvider token={token}>
          <Component {...pageProps} />
        </PreviewProvider>
      ) : (
        getLayout(<Component {...pageProps} />)
      )}
      {draftMode && (
        <Suspense>
          <VisualEditing />
        </Suspense>
      )}
    </>
  )
}
