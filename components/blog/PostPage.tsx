import SectionSeparator from 'components/SectionSeparator'
import type { InternalPost, Post, Settings } from 'lib/sanity.queries'
import { notFound } from 'next/navigation'

import PostBody from './PostBody'
import PostHeader from './PostHeader'
import PostTitle from './PostTitle'
import PostsList from './PostsList'
import HeadInner from '../shared/HeadInner'

export interface PostPageProps {
  preview?: boolean
  loading?: boolean
  post: InternalPost
  morePosts: Post[]
}

const NO_POSTS: Post[] = []

export default function PostPage(props: PostPageProps) {
  const { preview, morePosts = NO_POSTS, post } = props

  const slug = post?.slug

  if (!slug && !preview) {
    notFound()
  }

  return (
    <>
      <HeadInner {...post.meta} />
      {preview && !post ? (
        <PostTitle>Loading…</PostTitle>
      ) : (
        <>
          <article>
            <PostHeader {...post} />
            <PostBody content={post.content} />
          </article>
          <SectionSeparator />
          {morePosts?.length > 0 && (
            <PostsList content={morePosts} title="More Stories" />
          )}
        </>
      )}
    </>
  )
}
