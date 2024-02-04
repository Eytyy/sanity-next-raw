import CoverImage from 'components/CoverImage'
import type { Artwork } from 'lib/sanity.queries'
import Link from 'next/link'

export default function ArtworkCard({ title, coverImage, slug }: Artwork) {
  return (
    <div>
      <div className="mb-5">
        <CoverImage
          slug={`/artwork/${slug}`}
          title={title}
          image={coverImage}
          priority={false}
          maxWidth={500}
          sizes="(max-width: 500px) 100vw, 33vw"
        />
      </div>
      <h3 className="text-3xl leading-snug">
        <Link href={`/artwork/${slug}`} className="hover:underline">
          {title}
        </Link>
      </h3>
    </div>
  )
}
