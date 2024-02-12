import AlertBanner from 'components/AlertBanner'
import { useRouter } from 'next/router'
import React, { PropsWithChildren } from 'react'

import Container from '@/components/shared/Container'
import Header from '@/components/shared/Header'
import { Settings } from '@/lib/sanity.queries'

import { RQProvider } from '../Providers'

interface LayoutProps {
  preview: boolean
  loading?: boolean
  settings: Settings
  title?: string
}

export default function Layout({
  preview,
  loading,
  children,
  settings = {},
  title,
}: PropsWithChildren<LayoutProps>) {
  const router = useRouter()
  const { asPath } = router
  const isHome = asPath === '/'
  const level = isHome ? 1 : 2
  return (
    <RQProvider>
      <Container>
        <Header
          menu={settings.menu}
          title={title || settings.title}
          description={settings.description}
          level={level}
        />
        <div className="min-h-screen">
          <AlertBanner preview={preview} loading={loading} />
          <main>{children}</main>
        </div>
      </Container>
    </RQProvider>
  )
}
