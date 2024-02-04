import { Artist, Artwork, Post } from '@/lib/sanity.queries'

export type ReferencedPostsModuleProps = {
  _type: 'module.posts'
  _key: string
  title: string
  content: Post[]
  addLandingLink?: boolean
}

export type ReferencedArtistsModuleProps = {
  _type: 'module.artists'
  _key: string
  title: string
  variant: 'latest' | 'manual'
  content: Artist[]
  addLandingLink: boolean
}

export type ReferencedArtworksModuleProps = {
  _type: 'module.artworks'
  _key: string
  title: string
  variant: 'latest' | 'manual'
  content: Artwork[]
  addLandingLink: boolean
}

export type ImageModuleProps = {
  _type: 'module.image'
  _key: string
  image: any
  addCTA: boolean
  addCaption: boolean
  addTextOverlay: boolean
  alt: string
  caption: string
  cta: any
  textOverlay: string
}

export type ModuleProps =
  | ReferencedPostsModuleProps
  | ReferencedArtistsModuleProps
  | ReferencedArtworksModuleProps
  | ImageModuleProps
