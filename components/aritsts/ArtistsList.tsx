import Link from 'next/link'

import type { ReferencedArtistsModuleProps } from '../modules/types'
import ArtistCard from './ArtistCard'

export default function ArtistsList(
  props: Omit<ReferencedArtistsModuleProps, '_type'>,
) {
  return (
    <section>
      <h2 className="mb-8 text-6xl font-bold leading-tight tracking-tighter md:text-7xl flex justify-between">
        {props.title}
        <Link className="underline" href="/artists">
          See all
        </Link>
      </h2>
      <div className="grid grid-cols-1 gap-y-20 md:grid-cols-3 md:gap-x-16 md:gap-y-20 lg:gap-x-20">
        {props.content.map((artist) => (
          <ArtistCard key={artist._id} {...artist} />
        ))}
      </div>
    </section>
  )
}
