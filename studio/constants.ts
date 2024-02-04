// Document types which:
// - cannot be created in the 'new document' menu
// - cannot be duplicated, unpublished or deleted
export const LOCKED_DOCUMENT_TYPES = ['settings', 'home', 'media.tag']

// References to include in 'internal' links
export const PAGE_REFERENCES = [
  { type: 'home' },
  { type: 'post' },
  { type: 'artwork' },
  { type: 'artist' },
]
