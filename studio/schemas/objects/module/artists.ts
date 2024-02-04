import { UsersIcon } from '@sanity/icons'
import { defineField } from 'sanity'

export default defineField({
  name: 'module.artists',
  title: 'Artists',
  type: 'object',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Featured Artists',
    }),
    defineField({
      name: 'items',
      title: 'Artists',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'artist' }] }],
      description: 'Select 3 artists to display.',
      validation: (Rule) =>
        Rule.custom((content, { document }) => {
          if (document.variant === 'manual') {
            if (content.length !== 3) {
              return 'Please add exactly 3 artists'
            }
          }
          return true
        }),
    }),
    defineField({
      name: 'addLandingLink',
      title: 'Add artists page link',
      description:
        'Adds a link to the artists page at the bottom of the module',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title,
        media: UsersIcon,
      }
    },
  },
})
