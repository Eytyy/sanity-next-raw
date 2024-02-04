import { TextIcon } from '@sanity/icons'
import { defineField } from 'sanity'

export default defineField({
  name: 'module.body',
  title: 'Text',
  type: 'object',
  icon: TextIcon,
  fields: [
    defineField({
      name: 'text',
      title: 'Text',
      type: 'body',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Text',
      }
    },
  },
})
