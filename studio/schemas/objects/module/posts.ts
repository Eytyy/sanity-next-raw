import { BookIcon } from '@sanity/icons'
import { defineField } from 'sanity'

export default defineField({
  name: 'module.posts',
  title: 'Posts',
  type: 'object',
  icon: BookIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Latest Posts',
    }),
    defineField({
      name: 'variant',
      title: 'Variant',
      type: 'string',
      description:
        'Select whether to display the latest posts or manually select 3 posts to display.',
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
      name: 'posts',
      title: 'Posts',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'post' }] }],
      hidden: ({ parent }) => parent?.variant !== 'manual',
      description: 'Select 3 posts to display.',
      validation: (Rule) =>
        Rule.custom((content, { document }) => {
          if (document.variant === 'manual' && content.length !== 3) {
            return 'Please add exactly 3 posts'
          }
          return true
        }),
    }),
    defineField({
      name: 'addLandingLink',
      title: 'Add posts page link',
      description: 'Adds a link to the posts page at the bottom of the module',
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
        media: BookIcon,
      }
    },
  },
})
