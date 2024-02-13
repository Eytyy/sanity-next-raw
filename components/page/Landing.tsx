import { notFound } from 'next/navigation'

import { Settings } from '@/lib/sanity.queries'

import Module from '../modules'
import type { ModuleProps } from '../modules/types'
import HeadLanding from '../shared/HeadLanding'
import PageHero from './PageHero'

export interface LandingPageProps {
  page?: {
    _id: string
    title: string
    slug: string
    hero: {
      content: ModuleProps[]
    }
    content: ModuleProps[]
    meta: {
      title: string
      description: string
      ogImage: any
    }
  }
  settings: Settings
  preview?: boolean
  loading?: boolean
}

export default function LandingPageDisplay({
  preview,
  settings,
  page,
}: LandingPageProps) {
  const { title, slug, content, hero } = page
  if (!slug && !preview) {
    notFound()
  }
  return (
    <section>
      <HeadLanding settings={settings} title={title} />
      <PageHero content={hero.content} />
      <div className="space-y-24 pb-24">
        {content?.length > 0 &&
          content.map((module) => <Module key={module._key} module={module} />)}
      </div>
    </section>
  )
}
