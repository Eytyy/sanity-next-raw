import { groq } from 'next-sanity'

import { ImageProps } from '@/components/modules/types'
import { ExternalLinkProps } from '@/components/nav/ExternalLink'
import { InternalLinkProps } from '@/components/nav/InternalLink'

const imageAssetFields = groq`
  hotspot {
    x,
    y,
    width,
    height,
   },
  crop { _type, top, bottom, left, right},
  ...(asset-> {
    _id,
    "width": metadata.dimensions.width,
    "height": metadata.dimensions.height,
  })
`
const imageFields = groq`
  _type, alt,
  ${imageAssetFields}
`

const portableTextFields = groq`
  ...,
  _type == 'module.image' => {
    _type, alt, caption,
    image {
      ${imageAssetFields}
    }
  }
`
const postFields = groq`
  _id,
  title,
  date,
  _updatedAt,
  _createdAt,
  excerpt,
  coverImage {
    ${imageFields}
  },
  variant,
  externalUrl,
  "slug": slug.current,
  "authors": author[]->{name, picture},
  variant == 'internal' => {
    "meta": {
      title,
      defined(meta.description) => {
        "description": meta.description
      },
      !defined(meta.description) => {
        "description": excerpt
      },
      defined(meta.ogImage) => {
        "ogImage": meta.ogImage
      },
      !defined(meta.ogImage) => {
        "ogImage": coverImage
      }
    }
  }
`

const postCategoryFields = groq`
  _id,
  title,
  "slug": slug.current,
`

export const postPreviewFields = groq`
  _id,
  _type,
  excerpt,
  title,
  coverImage {
    ${imageFields}
  },
  variant,
  externalUrl,
  date,
  "categories": category[]->{
    ${postCategoryFields}
  },
  "slug": slug.current,
`

const artworkFields = groq`
  _id,
  title,
  coverImage {
    ${imageFields}
  },
  addGallery,
  gallery,
  artist->,
  date,
  source,
  "slug": slug.current,
`

const artworkPreviewFields = groq`
  _id,
  _type,
  coverImage {
    ${imageFields}
  },
  title,
  artist-> {
    name,
    "slug": slug.current,
  },
  date,
  "slug": slug.current,
`

const artistFields = groq`
  _id,
  name,
  bio,
  coverImage {
    ${imageFields}
  },
  gallery,
  "slug": slug.current,
  "meta": {
    "title": name,
    defined(meta.description) => {
      "description": meta.description
    },
    !defined(meta.description) => {
      "description": pt::text(bio)
    },
    defined(meta.ogImage) => {
      "ogImage": meta.ogImage
    },
    !defined(meta.ogImage) => {
      "ogImage": coverImage
    }
  }
`
const artistPreviewFields = groq`
  _id,
  _type,
  name,
  coverImage {
    ${imageFields}
  },
  "slug": slug.current,
`
const imageModuleFields = groq`
  alt, _type, asset->,
  addCaption, caption,
  addTextOverlay, textOverlay,
  addCTA,
  cta[0] {
    _type,
    title,
    _type == 'linkInternal' => {
      "url": reference->.slug.current
    }
  }
`

export const settingsQuery = groq`*[_type == "settings"][0] {
  ...,
  menu[] {
    title, _key, _type,
    _type == 'linkInternal' => {
      "href": reference->.slug.current
    },
    _type == 'linkExternal' => {
      "href": url
    },
    _type == 'linkContent' => {
      "href": reference->.slug.current
    }
  },
  'artworkCount': count(*[_type == 'artwork']),
  'postsCount': count(*[_type == 'post']),
  'artistsCount': count(*[_type == 'artist']),
}`

const textModule = groq`
  _type == 'module.body' => {
    text[] {
      ${portableTextFields}
    }
  }
`
const imageModule = groq`
  _type == 'module.image' => {
    ${imageModuleFields},
    image {
      ${imageAssetFields}
    }
  }
`

const videoModule = groq`
  _type == 'module.video' => {
    "src": video.asset->url,
    layout,
    autoplay,
    loop,
    "cover": image {
      "alt": ^.title,
      ${imageAssetFields}
    }
  }
`

const youtubeModule = groq`
  _type == 'module.youtube' => {
    "src": url,
    autoplay,
    loop,
    "cover": image {
      "alt": ^.title,
      ${imageAssetFields}
    }
  }
`

const mediaModule = groq`
  _type == 'module.media' => {
    variant,
    items[] {
      _key, _type,
      ${imageModule},
      ${videoModule},
      ${youtubeModule}
    }
  }
`

const postModule = groq`
  _type == 'module.posts' => {
    addLandingLink,
    variant == 'latest' =>  {
      "content": *[_type == 'post'] | order(_createdAt desc)[0..2] {
        ${postPreviewFields}
      }
    },
    variant == 'manual' => {
      "content": posts[]-> {
        ${postPreviewFields}
      }
    }
  }
`

const artistModule = groq`
  _type == 'module.artists' => {
    addLandingLink,
    "content": items[]-> {
      ${artistPreviewFields}
    }
  }
`

const artworkModule = groq`
  _type == 'module.artworks' => {
    addLandingLink,
    variant == 'latest' =>  {
      "content": *[_type == 'artwork'] | order(_createdAt desc)[0..2] {
        ${artworkPreviewFields}
      }
    },
    variant == 'manual' => {
      "content": artworks[]-> {
        ${artworkPreviewFields}
      }
    }
  }
`

const homeHeroModuleFields = groq`
  _type, variant,
  content[] {
    _key, _type, title,
    ${imageModule},
    ${videoModule},
    ${youtubeModule}
  }
`

export const indexQuery = groq`
*[_type == "home"][0] {
   hero {
    ${homeHeroModuleFields}
  },
  content[] {
    _key, _type, title,
    ${imageModule},
    ${mediaModule},
    ${videoModule},
    ${youtubeModule},
    ${postModule},
    ${artistModule},
    ${artworkModule},
    ${textModule}
  }
}`

export const pagesSlugsQuery = groq`
*[_type == "page" && defined(slug.current)][].slug.current
`

export const pageBySlugQuery = groq`
*[_type == "page" && slug.current == $slug][0] {
  _id,
  title,
  "slug":  slug.current,
  content[] {
    _type, _key, title,
    ${imageModule},
    ${mediaModule},
    ${videoModule},
    ${youtubeModule},
    ${textModule}
  },
  hero {
    content[] {
      _key, _type, title,
      ${imageModule},
      ${videoModule},
      ${youtubeModule}
    }
  }
}`

export const blogQuery = groq`
*[_type == "post"] | order(date desc)[0...7] {
  ${postFields}
}`

export const postCategoriesQuery = groq`
*[_type == "postCategory"] {
  _id, title, "slug": slug.current
}`

export const nextPostsQuery = groq`*[_type == "post" && date < $date] | order(date desc)[0...6]`

export const postAndMoreStoriesQuery = groq`
{
  "post": *[_type == "post" && slug.current == $slug] | order(_updatedAt desc) [0] {
    content[] {
      ${portableTextFields}
    },
    ${postFields}
  },
  "morePosts": *[_type == "post" && slug.current != $slug] | order(date desc, _updatedAt desc) [0...3] {
    content,
    ${postFields},

  }
}`

export const postSlugsQuery = groq`
*[_type == "post" && defined(slug.current)][].slug.current
`

export const postBySlugQuery = groq`
*[_type == "post" && slug.current == $slug][0] {
  content[] {
    ${portableTextFields}
  },
  ${postFields}
}
`

export const artworkQuery = groq`
*[_type == 'artwork' && defined(slug.current)][] {
  ${artworkPreviewFields}
}
`

export const artworkSlugsQuery = groq`
*[_type == 'artwork' && defined(slug.current)][].slug.current
`

export const artworkBySlugQuery = groq`
*[_type == 'artwork' && slug.current == $slug][0] {
  ${artworkFields}
}
`

export const artistsQuery = groq`
*[_type == 'artist' && defined(slug.current)][] {
  ${artistPreviewFields}
}
`

export const artistSlugsQuery = groq`
*[_type == 'artist' && defined(slug.current)][].slug.current
`

export const artistBySlugQuery = groq`
*[_type == 'artist' && slug.current == $slug][0] {
  ${artistFields}
}
`

export interface Author {
  name?: string
  picture?: any
}

export type ExternalPost = {
  variant: 'external'
  _id: string
  title: string
  coverImage: ImageProps
  date: string
  externalUrl: string
  excerpt?: string
  categories?: PostCategory[]
}

export type InternalPost = {
  variant: 'internal'
  _id: string
  title?: string
  coverImage: ImageProps
  date: string
  _updatedAt?: string
  excerpt?: string
  authors?: Author[]
  slug: string
  content?: any
  categories?: PostCategory[]
  meta: {
    title: string
    description: string
    ogImage: any
  }
}

export type Post = ExternalPost | InternalPost

export interface Artwork {
  _id: string
  title: string
  coverImage: ImageProps
  slug: string
  artist?: Artist
  date?: string
  source: {
    title: string
    url: string
  }
  addGallery?: boolean
}

export interface Artist {
  _id: string
  name: string
  bio: any
  coverImage: ImageProps
  gallery?: any
  slug: string
  meta: {
    title: string
    description: string
    ogImage: any
  }
}

export interface Settings {
  title?: string
  description?: any[]
  ogImage?: any
  menu?: (ExternalLinkProps | InternalLinkProps)[]
}

export interface PostCategory {
  _id: string
  title: string
  slug: string
}
