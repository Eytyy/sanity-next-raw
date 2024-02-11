import type { Artist, Settings } from 'lib/sanity.queries'
import React from 'react'

import HeadLanding from '../shared/HeadLanding'
import ArtistCard from './ArtistCard'

export interface ArtistsLandingPageProps {
  preview?: boolean
  loading?: boolean
  settings: Settings
  artists: Artist[]
  title?: string
}

export default function ArtistsLandingPage(props: ArtistsLandingPageProps) {
  const { settings, title, artists } = props
  return (
    <section>
      <HeadLanding settings={settings} title={title} />
      <div className="grid grid-cols-1 gap-y-20 md:grid-cols-3 md:gap-x-16 md:gap-y-20 lg:gap-x-20">
        {artists?.map((artist) => <ArtistCard key={artist._id} {...artist} />)}
      </div>
    </section>
  )
}
