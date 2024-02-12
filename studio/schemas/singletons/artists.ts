import { MdOutlinePerson } from 'react-icons/md'
import { defineField } from 'sanity'

export default defineField({
  name: 'artistsPage',
  title: 'Artists',
  type: 'document',
  icon: MdOutlinePerson,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'Artists',
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
