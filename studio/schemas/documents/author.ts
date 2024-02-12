import { MdPerson } from 'react-icons/md'
import { defineField, defineType } from 'sanity'

import { defineImageField } from '../utils'

export default defineType({
  name: 'author',
  title: 'Author',
  icon: MdPerson,
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineImageField({
      name: 'picture',
      title: 'Picture',
    }),
  ],
})
