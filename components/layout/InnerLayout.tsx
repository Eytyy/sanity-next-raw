import AlertBanner from 'components/AlertBanner'
import React, { PropsWithChildren } from 'react'

import Container from '@/components/shared/Container'
import Header from '@/components/shared/Header'
import { Settings } from '@/lib/sanity.queries'

import Footer from '../Footer'

interface LayoutProps {
  preview: boolean
  loading?: boolean
  settings: Settings
  title?: string
}

export default function InnerLayout({
  preview,
  loading,
  children,
  settings,
  title,
}: PropsWithChildren<LayoutProps>) {
  return (
    <Container>
      <Header
        menu={settings.menu}
        title={title || settings.title}
        description={settings.description}
        level={2}
      />
      <div className="min-h-screen">
        <AlertBanner preview={preview} loading={loading} />
        <main>{children}</main>
      </div>
      <Footer />
    </Container>
  )
}
