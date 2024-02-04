import type { ReferencedArtworksModuleProps } from '../modules/types'
import ArtworkCard from './ArtworkCard'

export default function ArtworkList(
  props: Omit<ReferencedArtworksModuleProps, '_type'>,
) {
  return (
    <section>
      <h2 className="mb-8 text-6xl font-bold leading-tight tracking-tighter md:text-7xl">
        {props.title}
      </h2>
      <div className="mb-32 grid grid-cols-1 gap-y-20 md:grid-cols-3 md:gap-x-16 md:gap-y-20 lg:gap-x-20">
        {props.content.map((artwork) => (
          <ArtworkCard key={artwork._id} {...artwork} />
        ))}
      </div>
    </section>
  )
}
