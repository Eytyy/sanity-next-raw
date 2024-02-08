import PostPage from 'components/blog/PostPage'
import PreviewPostPage from 'components/blog/PreviewPostPage'
import { readToken } from 'lib/sanity.api'
import {
  getAllPostsSlugs,
  getPostAndMoreStories,
  getSettings,
} from 'lib/sanity.client'
import { InternalPost, Post, Settings } from 'lib/sanity.queries'
import { GetStaticProps } from 'next'
import type { SharedPageProps } from 'pages/_app'

import {
  addBlurDataURLToImage,
  pareseContentImagesBlurDataURL,
  pareseModulesImagesBlurDataURL,
} from '@/lib/imageBlurData'

interface PageProps extends SharedPageProps {
  post: InternalPost
  morePosts: Post[]
  settings?: Settings
}

interface Query {
  [key: string]: string
}

export default function ProjectSlugRoute(props: PageProps) {
  const { settings, post, morePosts, draftMode } = props

  if (draftMode) {
    return <PreviewPostPage post={post} morePosts={morePosts} />
  }

  return <PostPage post={post} morePosts={morePosts} />
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const { draftMode = false, params = {} } = ctx
  const token = draftMode ? readToken : undefined

  const [settings, { post, morePosts }] = await Promise.all([
    getSettings(token),
    getPostAndMoreStories(token, params.slug),
  ])

  if (!post) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      post: {
        ...post,
        content: await pareseModulesImagesBlurDataURL(post.content),
        coverImage: await addBlurDataURLToImage(post.coverImage),
      },
      morePosts: await pareseContentImagesBlurDataURL(morePosts),
      settings,
      draftMode,
      token: token ?? '',
    },
  }
}

export const getStaticPaths = async () => {
  const slugs = await getAllPostsSlugs()
  return {
    paths: slugs?.map(({ slug }) => `/blog/${slug}`) || [],
    fallback: 'blocking',
  }
}
