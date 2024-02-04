import Avatar from 'components/AuthorAvatar'
import CoverImage from 'components/CoverImage'
import type { InternalPost } from 'lib/sanity.queries'

import PostDate from './PostDate'
import PostTitle from './PostTitle'

export default function PostHeader(props: InternalPost) {
  const { title, coverImage, date, slug } = props
  return (
    <>
      <PostTitle>{title}</PostTitle>

      <div className="mb-8 sm:mx-0 md:mb-16">
        <CoverImage
          title={title}
          image={coverImage}
          priority
          slug={slug}
          maxWidth={2000}
          sizes="100vw"
        />
      </div>
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 text-lg">
          <PostDate dateString={date} />
        </div>
      </div>
    </>
  )
}
