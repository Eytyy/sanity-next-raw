import {
  type InternalPost,
  type Post,
  postAndMoreStoriesQuery,
} from 'lib/sanity.queries'
import { useLiveQuery } from 'next-sanity/preview'

import PostPage, { type PostPageProps } from './PostPage'

export default function PreviewPostPage(props: PostPageProps) {
  const [{ post: postPreview, morePosts }, loadingPost] = useLiveQuery<{
    post: InternalPost
    morePosts: Post[]
  }>(
    { post: props.post, morePosts: props.morePosts },
    postAndMoreStoriesQuery,
    {
      slug: props.post.slug,
    },
  )
  return (
    <PostPage
      preview
      loading={loadingPost}
      post={postPreview}
      morePosts={morePosts}
    />
  )
}
