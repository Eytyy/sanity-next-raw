import Link from 'next/link'

import type { ReferencedPostsModuleProps } from '../modules/types'
import PostCard from './PostCard'

export default function PostsList(
  props: Omit<ReferencedPostsModuleProps, '_type' | '_key'>,
) {
  return (
    <section>
      <h2 className="mb-8 text-6xl font-bold leading-tight tracking-tighter md:text-7xl flex justify-between">
        {props.title}
        {props.addLandingLink && (
          <Link className="underline" href="/blog">
            See all
          </Link>
        )}
      </h2>
      <div className="grid grid-cols-1 gap-y-20 md:grid-cols-3 md:gap-x-16 md:gap-y-20 lg:gap-x-20">
        {props.content?.map((post) => <PostCard key={post._id} {...post} />)}
      </div>
    </section>
  )
}
