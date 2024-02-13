import { HomeIcon } from '@sanity/icons'
import { defineField } from 'sanity'

const TITLE = 'Home'

export default defineField({
  name: 'home',
  title: TITLE,
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'hero.home',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        { type: 'module.image' },
        { type: 'module.video' },
        { type: 'module.youtube' },
        { type: 'module.media' },
        { type: 'module.posts' },
        { type: 'module.artists' },
        { type: 'module.artworks' },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        // media: icon,
        subtitle: 'Index',
        title: TITLE,
      }
    },
  },
})
