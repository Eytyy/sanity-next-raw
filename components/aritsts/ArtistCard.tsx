import CoverImage from 'components/CoverImage'
import type { Artist } from 'lib/sanity.queries'
import Link from 'next/link'

export default function ArtistCard({ name, coverImage, slug }: Artist) {
  return (
    <div>
      <div className="mb-5">
        <CoverImage
          slug={`/artists/${slug}`}
          title={name}
          image={coverImage}
          priority={false}
          maxWidth={500}
          sizes="(max-width: 500px) 100vw, 33vw"
          layout="square"
        />
      </div>
      <h3 className="text-3xl leading-snug">
        <Link href={`/artists/${slug}`} className="hover:underline">
          {name}
        </Link>
      </h3>
    </div>
  )
}
