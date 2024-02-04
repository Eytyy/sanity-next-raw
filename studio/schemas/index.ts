import { SchemaTypeDefinition } from 'sanity'

import body from './blocks/body'
import modules from './objects/module'

const singletons = [home, settings]

import advancedBody from './blocks/advancedBody'
import docs from './documents'
import objects from './objects'
import home from './singletons/home'
import settings from './singletons/settings'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [...docs, ...singletons, ...objects, ...modules, body, advancedBody],
}
