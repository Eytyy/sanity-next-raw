import type { Settings } from 'lib/sanity.queries'

import Module from '../modules'
import { ModuleProps } from '../modules/types'
import HeadLanding from '../shared/HeadLanding'
import HomeHero from './HomeHero'

export interface IndexPageProps {
  preview?: boolean
  loading?: boolean
  page: {
    hero: any
    modules: ModuleProps[]
  }
  settings: Settings
}

export default function IndexPage(props: IndexPageProps) {
  const { page, settings } = props
  const { hero, modules } = page
  console.log(modules)
  return (
    <>
      <HeadLanding settings={settings} />
      <HomeHero {...hero} />
      <div className="space-y-24 pb-24">
        {modules?.length > 0 &&
          modules.map((module) => <Module key={module._key} module={module} />)}
      </div>
    </>
  )
}
