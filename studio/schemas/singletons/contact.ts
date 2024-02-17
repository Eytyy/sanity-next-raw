import { MdOutlineAlternateEmail } from 'react-icons/md'
import { defineField } from 'sanity'

export default defineField({
  name: 'contact',
  title: 'Contact',
  type: 'document',
  icon: MdOutlineAlternateEmail,
  groups: [
    {
      title: 'Content',
      name: 'content',
      default: true,
    },
    {
      title: 'Form',
      name: 'form',
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'hero.page',
      group: 'content',
    }),
    defineField({
      name: 'form',
      title: 'Form',
      type: 'module.form',
      group: 'form',
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
      group: 'content',
    }),
  ],
})
