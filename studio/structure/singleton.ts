import { DocumentDefinition } from 'sanity'
import { StructureBuilder } from 'sanity/structure'

import { documentWithPreview } from './documentWithPreview'

export const singleton = (
  S: StructureBuilder,
  typeDef: DocumentDefinition,
  withPreview?: boolean,
) =>
  withPreview
    ? S.listItem()
        .title(typeDef.title)
        .icon(typeDef.icon)
        .child(documentWithPreview(S, typeDef))
    : S.listItem()
        .title(typeDef.title)
        .icon(typeDef.icon)
        .child(
          S.editor()
            .id(typeDef.name)
            .schemaType(typeDef.name)
            .documentId(typeDef.name),
        )
