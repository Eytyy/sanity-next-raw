import type { Settings } from 'lib/sanity.queries'

import Module from '../modules'
import { MediaConfig, ModuleProps } from '../modules/types'
import HeadLanding from '../shared/HeadLanding'
import HomeHero from './HomeHero'

export interface IndexPageProps {
  preview?: boolean
  loading?: boolean
  page: {
    hero: {
      variant: 'default' | 'slider' | 'grid'
      content: ModuleProps[]
    }
    content: ModuleProps[]
  }
  settings: Settings
}
const mediaConfig: MediaConfig = {
  maxWidth: 2000,
  background: true,
  objectFit: 'contain',
}
export default function IndexPage(props: IndexPageProps) {
  const { page, settings } = props
  const { hero, content } = page
  return (
    <>
      <HeadLanding settings={settings} />
      {hero && hero.content?.length > 0 && <HomeHero {...hero} />}
      <div className="space-y-24 pb-24">
        {content?.length > 0 &&
          content.map((module) => (
            <Module
              key={module._key}
              module={module}
              mediaConfig={mediaConfig}
            />
          ))}
      </div>
    </>
  )
}
