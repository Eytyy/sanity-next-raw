import type { Artwork, Settings } from 'lib/sanity.queries'

import ArtworkCard from './ArtworkCard'
import HeadLanding from '../shared/HeadLanding'

export interface ArtworkLandingPageProps {
  preview?: boolean
  loading?: boolean
  artwork: Artwork[]
  settings: Settings
  title?: string
}

export default function ArtworkLandingPage(props: ArtworkLandingPageProps) {
  const { settings, title, artwork } = props
  return (
    <section>
      <HeadLanding settings={settings} title={title} />
      <div className="grid grid-cols-1 gap-y-20 md:grid-cols-3 auto-rows-auto md:gap-x-16 md:gap-y-20 lg:gap-x-20">
        {artwork?.map((work) => <ArtworkCard key={work._id} {...work} />)}
      </div>
    </section>
  )
}
