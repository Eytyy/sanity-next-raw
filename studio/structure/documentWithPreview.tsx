import { DRAFT_MODE_ROUTE } from 'lib/sanity.api'
import { type DocumentDefinition } from 'sanity'
import { StructureBuilder } from 'sanity/structure'
import { Iframe, IframeOptions } from 'sanity-plugin-iframe-pane'
import AuthorAvatarPreviewPane from 'studio/components/AuthorAvatarPreviewPane'

const iframeOptions = {
  url: {
    origin: 'same-origin',
    preview: (document) => {
      if (!document) {
        return new Error('Missing document')
      }
      switch (document._type) {
        case 'post':
          return (document as any)?.slug?.current
            ? `/blog/${(document as any).slug.current}`
            : new Error('Missing slug')
        case 'artwork':
          return (document as any)?.slug?.current
            ? `/artworks/${(document as any).slug.current}`
            : new Error('Missing slug')
        case 'home':
          return '/'
        default:
          return new Error(`Unknown document type: ${document?._type}`)
      }
    },
    draftMode: DRAFT_MODE_ROUTE,
  },
  reload: { button: true },
} satisfies IframeOptions

export const documentWithPreview = (
  S: StructureBuilder,
  typeDef: DocumentDefinition,
) => {
  switch (typeDef.name) {
    case 'author':
      return S.document()
        .schemaType(typeDef.name)
        .views([
          S.view.form(),
          S.view
            .component(({ document }) => (
              <AuthorAvatarPreviewPane
                name={document.displayed.name as any}
                picture={document.displayed.picture as any}
              />
            ))
            .title('Preview'),
        ])

    default:
      return S.document()
        .schemaType(typeDef.name)
        .views([
          S.view.form(),
          S.view.component(Iframe).options(iframeOptions).title('Preview'),
        ])
  }
}
