import { SchemaTypeDefinition } from 'sanity'

import advancedBody from './blocks/advancedBody'
import body from './blocks/body'
import docs from './documents'
import objects from './objects'
import modules from './objects/module'
import singletons from './singletons'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [...docs, ...singletons, ...objects, ...modules, body, advancedBody],
}
