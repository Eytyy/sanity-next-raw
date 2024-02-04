import type { Settings } from 'lib/sanity.queries'

import Module from '../modules'
import { ModuleProps } from '../modules/types'
import HomeHero from './HomeHero'
import HeadLanding from '../shared/HeadLanding'

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
  return (
    <>
      <HeadLanding settings={settings} />
      <HomeHero {...hero} />
      {modules?.length > 0 &&
        modules.map((module) => <Module key={module._key} module={module} />)}
    </>
  )
}
