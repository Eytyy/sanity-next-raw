import { MdEdit } from 'react-icons/md'
import { defineField } from 'sanity'

export default defineField({
  name: 'blog',
  title: 'Blog',
  type: 'document',
  icon: MdEdit,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'Blog',
    }),
    defineField({
      name: 'order',
      title: 'Order Content By',
      type: 'string',
      options: {
        list: [
          { title: 'Date', value: 'date' },
          { title: 'Title', value: 'title' },
        ],
      },
      validation: (Rule) => Rule.required(),
      initialValue: 'date',
    }),
    defineField({
      name: 'filterOptions',
      title: 'Filter Options',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Artist', value: 'artist' },
          { title: 'Category', value: 'category' },
        ],
      },
      validation: (Rule) => Rule.required(),
      initialValue: ['artist', 'category'],
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: (Rule) => Rule.required(),
      readOnly: true,
    }),
  ],
})
