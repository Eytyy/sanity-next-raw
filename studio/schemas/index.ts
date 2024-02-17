import { SchemaTypeDefinition } from 'sanity'

import advancedBody from './blocks/advancedBody'
import body from './blocks/body'
import docs from './documents'
import objects from './objects'
import modules from './objects/module'
import email from './objects/module/forms/email'
import form from './objects/module/forms/form'
import formField from './objects/module/forms/formField'
import message from './objects/module/forms/message'
import name from './objects/module/forms/name'
import singletons from './singletons'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    ...docs,
    ...singletons,
    ...objects,
    ...modules,
    form,
    formField,
    email,
    name,
    message,
    body,
    advancedBody,
  ],
}
