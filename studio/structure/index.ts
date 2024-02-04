import { StructureBuilder } from 'sanity/structure'
import artistType from 'studio/schemas/documents/artist'
import artworkType from 'studio/schemas/documents/artwork'
import authorType from 'studio/schemas/documents/author'
import postType from 'studio/schemas/documents/post'
import postCategoryType from 'studio/schemas/documents/postCategory'
import homeType from 'studio/schemas/singletons/home'
import settingsType from 'studio/schemas/singletons/settings'

import { list } from './list'
import { singleton } from './singleton'

const excludeTypes = [
  authorType.name,
  postType.name,
  artworkType.name,
  homeType.name,
  settingsType.name,
  postCategoryType.name,
  artistType.name,
  'media.tag',
]

// like how "Post" and "Author" is handled.
export const structure = (S: StructureBuilder) => {
  // The default root list items (except custom ones)
  const defaultListItems = S.documentTypeListItems().filter(
    (listItem) =>
      !excludeTypes.includes(listItem.getId() as (typeof excludeTypes)[number]),
  )
  return S.list()
    .title('Content')
    .items([
      singleton(S, homeType),
      S.divider(),
      list(S, 'Artists', artistType),
      list(S, 'Artworks', artworkType),
      S.divider(),
      list(S, 'Blog Posts', postType),
      list(S, 'Post Categories', postCategoryType),
      list(S, 'Authors', authorType),
      S.divider(),
      ...defaultListItems,
      singleton(S, settingsType),
    ])
}
