import { DocumentDefinition } from 'sanity'
import { StructureBuilder } from 'sanity/structure'

import { documentWithPreview } from './documentWithPreview'

export const list = (
  S: StructureBuilder,
  title: string,
  typeDef: DocumentDefinition,
) =>
  S.listItem()
    .title(title)
    .icon(typeDef.icon)
    .child(
      S.documentTypeList(typeDef.name)
        .title(title)
        .child(documentWithPreview(S, typeDef)),
    )
