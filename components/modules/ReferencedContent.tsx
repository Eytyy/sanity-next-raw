import ArtistsList from '@/components/aritsts/ArtistsList'
import ArtworkList from '@/components/artwork/ArtworkList'
import PostsList from '@/components/blog/PostsList'
import type {
  ReferencedArtistsModuleProps,
  ReferencedArtworksModuleProps,
  ReferencedPostsModuleProps,
} from './types'

export type ReferencedContentProps =
  | ReferencedPostsModuleProps
  | ReferencedArtistsModuleProps
  | ReferencedArtworksModuleProps

export default function ReferencedContent(module: ReferencedContentProps) {
  switch (module._type) {
    case 'module.posts':
      return <PostsList {...module} />
    case 'module.artists':
      return <ArtistsList {...module} />
    case 'module.artworks':
      return <ArtworkList {...module} />
    default:
      return null
  }
}
