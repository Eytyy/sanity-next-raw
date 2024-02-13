import {
  apiVersion,
  dataset,
  projectId,
  studioUrl,
  useCdn,
} from 'lib/sanity.api'
import type {
  Artist,
  Artwork,
  InternalPost,
  Post,
  PostCategory,
  Settings,
} from 'lib/sanity.queries'
import {
  artistBySlugQuery,
  artistSlugsQuery,
  artistsQuery,
  artworkBySlugQuery,
  artworkQuery,
  artworkSlugsQuery,
  contactQuery,
  indexQuery,
  pageBySlugQuery,
  pagesSlugsQuery,
  postAndMoreStoriesQuery,
  postBySlugQuery,
  postCategoriesQuery,
  postPreviewFields,
  postSlugsQuery,
  settingsQuery,
} from 'lib/sanity.queries'
import { createClient, type SanityClient } from 'next-sanity'

import { ContactPageProps } from '@/components/contact/ContactPageDisplay'
import type { IndexPageProps } from '@/components/home/IndexPage'
import type { LandingPageProps } from '@/components/page/Landing'

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

export async function getSettings(readToken?: string): Promise<Settings> {
  const client = getClient(readToken ? { token: readToken } : undefined)
  return (await client.fetch(settingsQuery)) || {}
}

export async function getAllPagesSlugs(): Promise<
  Pick<LandingPageProps['page'], 'slug'>[]
> {
  const client = getClient()
  const slugs = (await client.fetch<string[]>(pagesSlugsQuery)) || []
  return slugs.map((slug) => ({ slug }))
}

export async function getPageBySlug(
  slug: string,
  readToken?: string,
): Promise<LandingPageProps['page']> {
  const client = getClient(readToken ? { token: readToken } : undefined)
  return (await client.fetch(pageBySlugQuery, { slug })) || ({} as any)
}

export async function getHome(
  readToken?: string,
): Promise<IndexPageProps['page']> {
  const client = getClient(readToken ? { token: readToken } : undefined)
  return await client.fetch(indexQuery)
}

export async function getContact(
  readToken?: string,
): Promise<ContactPageProps['page']> {
  const client = getClient(readToken ? { token: readToken } : undefined)
  return await client.fetch(contactQuery)
}

export async function getBlog(
  filters: {
    name: string
    values: string[]
  }[],
  offset: number,
  postsPerPage: number,
  readToken?: string,
): Promise<Post[]> {
  const client = getClient(readToken ? { token: readToken } : undefined)
  const subset = `[${offset}...${offset + postsPerPage}]`
  const hasFilters = filters.length > 0
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
  readToken?: string,
): Promise<PostCategory[]> {
  const client = getClient(readToken ? { token: readToken } : undefined)

  return (await client.fetch(postCategoriesQuery)) || []
}

export async function getArtists(readToken?: string): Promise<Artist[]> {
  const client = getClient(readToken ? { token: readToken } : undefined)
  return (await client.fetch(artistsQuery)) || []
}

export async function getArtworks(readToken?: string): Promise<Artwork[]> {
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
  slug: string,
  readToken?: string,
): Promise<Post> {
  const client = getClient(readToken ? { token: readToken } : undefined)
  return (await client.fetch(postBySlugQuery, { slug })) || ({} as any)
}

export async function getPostAndMoreStories(
  slug: string,
  readToken?: string,
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
  slug: string,
  readToken?: string,
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
  slug: string,
  readToken?: string,
): Promise<Artwork> {
  const client = getClient(readToken ? { token: readToken } : undefined)
  return (await client.fetch(artworkBySlugQuery, { slug })) || ({} as any)
}
