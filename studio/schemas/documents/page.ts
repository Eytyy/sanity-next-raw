import { MdMenuBook } from 'react-icons/md'
import { defineField } from 'sanity'

export default defineField({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: MdMenuBook,
  groups: [
    { title: 'Content', name: 'content', default: true },
    { title: 'Seo & Social', name: 'seo' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    // Hero
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'hero.page',
      group: 'content',
    }),
    // Modules
    defineField({
      name: 'modules',
      title: 'Modules',
      type: 'array',
      of: [
        { type: 'module.body' },
        { type: 'module.image' },
        { type: 'module.video' },
        { type: 'module.youtube' },
        { type: 'module.media' },
        { type: 'module.posts' },
        { type: 'module.artists' },
        { type: 'module.artworks' },
      ],
      group: 'content',
    }),
    defineField({
      name: 'meta',
      title: 'Meta',
      type: 'meta',
      group: 'seo',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
  ],
})
