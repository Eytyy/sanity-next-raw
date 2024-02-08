import {
  apiVersion,
  dataset,
  projectId,
  studioUrl,
  useCdn,
} from 'lib/sanity.api'
import {
  Artist,
  artistBySlugQuery,
  artistSlugsQuery,
  artistsQuery,
  Artwork,
  artworkBySlugQuery,
  artworkQuery,
  artworkSlugsQuery,
  indexQuery,
  InternalPost,
  type Post,
  postAndMoreStoriesQuery,
  postBySlugQuery,
  postCategoriesQuery,
  PostCategory,
  postPreviewFields,
  postSlugsQuery,
  type Settings,
  settingsQuery,
} from 'lib/sanity.queries'
import { createClient, type SanityClient } from 'next-sanity'

import { IndexPageProps } from '@/components/home/IndexPage'

import { BuildBlogQueryFilterString } from './helpers'

export function getClient(preview?: { token: string }): SanityClient {
  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn,
    perspective: 'published',
    encodeSourceMap: preview?.token ? true : false,
    studioUrl,
  })
  if (preview) {
    if (!preview.token) {
      throw new Error('You must provide a token to preview drafts')
    }
    return client.withConfig({
      token: preview.token,
      useCdn: false,
      ignoreBrowserTokenWarning: true,
      perspective: 'previewDrafts',
    })
  }
  return client
}

export const getSanityImageConfig = () => getClient()

export async function getSettings(
  readToken: string | undefined,
): Promise<Settings> {
  const client = getClient(readToken ? { token: readToken } : undefined)
  return (await client.fetch(settingsQuery)) || {}
}

export async function getHome(
  readToken: string | undefined,
): Promise<IndexPageProps['page']> {
  const client = getClient(readToken ? { token: readToken } : undefined)
  return await client.fetch(indexQuery)
}

export async function getBlog(
  readToken: string | undefined,
  filters: {
    name: string
    values: string[]
  }[],
  offset: number,
  postsPerPage: number,
): Promise<Post[]> {
  const client = getClient(readToken ? { token: readToken } : undefined)
  const subset = `[${offset}...${offset + postsPerPage}]`
  const hasFilters = filters.length > 0
  let data
  if (hasFilters) {
    const filterString = BuildBlogQueryFilterString(filters)
    const q = `*[_type == "post" && ${filterString}] | order(date desc) ${subset} { ${postPreviewFields} }`
    return await client.fetch(q)
  }
  return await client.fetch(
    `*[_type == "post"] | order(date desc) ${subset} {
        ${postPreviewFields}
      }`,
  )
}

export async function getFilteredBlog(
  filters: {
    name: string
    values: string[]
  }[],
): Promise<Post[]> {
  const client = getClient()

  const hasFilters = filters.length > 0
  if (hasFilters) {
    const filterString = BuildBlogQueryFilterString(filters)
    const q = `*[_type == "post" && ${filterString}] | order(date desc) { ${postPreviewFields} }`
    return await client.fetch(q)
  }
  return await client.fetch(
    `*[_type == "post"] | order(date desc) [0...6] {
        ${postPreviewFields}
      }`,
  )
}

export async function getPostsCategories(
  readToken: string | undefined,
): Promise<PostCategory[]> {
  const client = getClient(readToken ? { token: readToken } : undefined)

  return (await client.fetch(postCategoriesQuery)) || []
}

export async function getArtists(
  readToken: string | undefined,
): Promise<Artist[]> {
  const client = getClient(readToken ? { token: readToken } : undefined)
  return (await client.fetch(artistsQuery)) || []
}

export async function getArtworks(
  readToken: string | undefined,
): Promise<Artwork[]> {
  const client = getClient(readToken ? { token: readToken } : undefined)
  return (await client.fetch(artworkQuery)) || []
}

export async function getAllPostsSlugs(): Promise<
  Pick<InternalPost, 'slug'>[]
> {
  const client = getClient()
  const slugs = (await client.fetch<string[]>(postSlugsQuery)) || []
  return slugs.map((slug) => ({ slug }))
}

export async function getPostBySlug(
  readToken: string | undefined,
  slug: string,
): Promise<Post> {
  const client = getClient(readToken ? { token: readToken } : undefined)
  return (await client.fetch(postBySlugQuery, { slug })) || ({} as any)
}

export async function getPostAndMoreStories(
  readToken: string | undefined,
  slug: string,
): Promise<{ post: InternalPost; morePosts: Post[] }> {
  const client = getClient(readToken ? { token: readToken } : undefined)
  return await client.fetch(postAndMoreStoriesQuery, { slug })
}

export async function getAllArtistSlugs(): Promise<Pick<Artist, 'slug'>[]> {
  const client = getClient()
  const slugs = (await client.fetch<string[]>(artistSlugsQuery)) || []
  return slugs.map((slug) => ({ slug }))
}

export async function getArtistBySlug(
  readToken: string | undefined,
  slug: string,
): Promise<Artist> {
  const client = getClient(readToken ? { token: readToken } : undefined)
  return (await client.fetch(artistBySlugQuery, { slug })) || ({} as any)
}

export async function getAllArtworkSlugs(): Promise<Pick<Artwork, 'slug'>[]> {
  const client = getClient()
  const slugs = (await client.fetch<string[]>(artworkSlugsQuery)) || []
  return slugs.map((slug) => ({ slug }))
}

export async function getArtworkBySlug(
  readToken: string | undefined,
  slug: string,
): Promise<Artwork> {
  const client = getClient(readToken ? { token: readToken } : undefined)
  return (await client.fetch(artworkBySlugQuery, { slug })) || ({} as any)
}
