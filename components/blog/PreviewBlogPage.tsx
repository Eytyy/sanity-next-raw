import {
  Artist,
  artistsQuery,
  indexQuery,
  type Post,
  postCategoriesQuery,
  type PostCategory,
  type Settings,
  settingsQuery,
} from 'lib/sanity.queries'
import { useLiveQuery } from 'next-sanity/preview'

import type { BlogPageProps } from './BlogPage'
import BlogPage from './BlogPage'

export default function PreviewBlogPage(props: BlogPageProps) {
  const [posts, loadingPosts] = useLiveQuery<Post[]>(props.posts, indexQuery)
  const [categories] = useLiveQuery<PostCategory[]>(
    props.categories,
    postCategoriesQuery,
  )
  const [artists] = useLiveQuery<Artist[]>(props.artists, artistsQuery)
  const [settings, loadingSettings] = useLiveQuery<Settings>(
    props.settings,
    settingsQuery,
  )

  return (
    <BlogPage
      preview
      loading={loadingPosts || loadingSettings}
      posts={posts || []}
      settings={settings || {}}
      categories={categories || []}
      artists={artists || []}
    />
  )
}
