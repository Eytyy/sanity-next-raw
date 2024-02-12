import { MdOutlineAlternateEmail } from 'react-icons/md'
import { defineField } from 'sanity'

export default defineField({
  name: 'contact',
  title: 'Contact',
  type: 'document',
  icon: MdOutlineAlternateEmail,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'hero.page',
    }),
    defineField({
      name: 'form',
      title: 'Form',
      type: 'module.form',
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
