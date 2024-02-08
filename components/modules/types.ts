import { Artist, Artwork, Post } from '@/lib/sanity.queries'

const layouts = ['landscape', 'square', 'portrait'] as const
export type MediaLayout = (typeof layouts)[number]

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

export type ImageProps = {
  _type: 'image'
  _id: string
  width: number
  height: number
  alt: string
  blurDataURL: string
  crop: {
    top: number
    bottom: number
    left: number
    right: number
  }
  hotspot: {
    x: number
    y: number
    width: number
    height: number
  }
}

export type ImageModuleProps = {
  _type: 'module.image'
  _key: string
  image: Omit<ImageProps, 'alt'>
  addCTA: boolean
  addCaption: boolean
  addTextOverlay: boolean
  alt: string
  caption: string
  cta: any
  textOverlay: string
}

export type YoutubeModuleProps = {
  _key: string
  _type: 'module.youtube'
  title: string
  src: string
  cover?: ImageProps
  autoplay: boolean
  loop: boolean
}

export type VideoModuleProps = {
  _key: string
  _type: 'module.video'
  title: string
  src: string
  cover?: ImageProps
  layout: MediaLayout
  autoplay: boolean
  loop: boolean
}

export type MediaModuleProps = {
  _type: 'module.media'
  _key: string
  variant: 'slider' | 'grid'
  items: (VideoModuleProps | YoutubeModuleProps | ImageModuleProps)[]
}

export type ModuleProps =
  | ReferencedPostsModuleProps
  | ReferencedArtistsModuleProps
  | ReferencedArtworksModuleProps
  | ImageModuleProps
  | YoutubeModuleProps
  | VideoModuleProps
  | MediaModuleProps
