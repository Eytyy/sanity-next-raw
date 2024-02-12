import { MdBrush } from 'react-icons/md'
import { defineField } from 'sanity'

export default defineField({
  name: 'artworkPage',
  title: 'Artwork',
  type: 'document',
  icon: MdBrush,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'Artwork',
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
