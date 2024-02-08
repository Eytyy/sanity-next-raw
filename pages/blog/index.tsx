import { readToken } from 'lib/sanity.api'
import {
  getArtists,
  getBlog,
  getPostsCategories,
  getSettings,
} from 'lib/sanity.client'
import type { SharedPageProps } from 'pages/_app'

import BlogPage from '@/components/blog/BlogPage'
import PreviewBlogPage from '@/components/blog/PreviewBlogPage'
import { ParseFiltersValues } from '@/lib/helpers'
import { pareseContentImagesBlurDataURL } from '@/lib/imageBlurData'
import {
  type Artist,
  type Post,
  type PostCategory,
  type Settings,
} from '@/lib/sanity.queries'

interface PageProps extends SharedPageProps {
  posts: Post[]
  settings: Settings
  categories: PostCategory[]
  artists: Artist[]
  title?: string
}

export default function Page(props: PageProps) {
  const { title, posts, settings, categories, artists, draftMode } = props
  if (draftMode) {
    return (
      <PreviewBlogPage
        title={title}
        posts={posts}
        settings={settings}
        categories={categories}
        artists={artists}
      />
    )
  }

  return (
    <BlogPage
      title={title}
      posts={posts}
      settings={settings}
      categories={categories}
      artists={artists}
    />
  )
}

export const getServerSideProps = async (ctx) => {
  const { draftMode = false } = ctx

  const postsPerPage = 6
  const { page = 1, ...filters } = ctx.query
  const parsedFilters = ParseFiltersValues(filters)
  const offset = (page - 1) * postsPerPage
  const token = draftMode ? readToken : undefined

  const [settings, posts = [], categories = [], artists = []] =
    await Promise.all([
      getSettings(token),
      getBlog(token, parsedFilters, offset, postsPerPage),
      getPostsCategories(token),
      getArtists(token),
    ])

  return {
    props: {
      posts: await pareseContentImagesBlurDataURL(posts),
      categories,
      artists,
      settings,
      draftMode,
      token: token ?? '',
      title: 'Blog',
    },
  }
}
