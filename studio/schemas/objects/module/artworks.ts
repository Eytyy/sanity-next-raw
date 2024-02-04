import { StarIcon } from '@sanity/icons'
import { defineField } from 'sanity'

export default defineField({
  name: 'module.artworks',
  title: 'Artworks',
  type: 'object',
  icon: StarIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Latest Artworks',
    }),
    defineField({
      name: 'variant',
      title: 'Variant',
      type: 'string',
      description:
        'Select whether to display the latest artworks or manually select 3 artworks to display.',
      options: {
        layout: 'radio',
        direction: 'horizontal',
        list: [
          { title: 'Latest', value: 'latest' },
          { title: 'Manual', value: 'manual' },
        ],
      },
      initialValue: 'latest',
    }),
    defineField({
      name: 'artworks',
      title: 'Artwork(s)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'artwork' }] }],
      description: 'Select 3 artworks to display.',
      hidden: ({ parent }) => parent?.variant !== 'manual',
      validation: (Rule) =>
        Rule.custom((content, { document }) => {
          if (document.variant === 'manual') {
            if (content.length !== 3) {
              return 'Please add exactly 3 artworks'
            }
          }
          return true
        }),
    }),
    defineField({
      name: 'addLandingLink',
      title: 'Add artworks page link',
      description:
        'Adds a link to the artworks page at the bottom of the module',
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
        media: StarIcon,
      }
    },
  },
})
