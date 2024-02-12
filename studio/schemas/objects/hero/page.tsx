import { defineField } from 'sanity'

export default defineField({
  name: 'hero.page',
  title: 'Page hero',
  type: 'object',
  fields: [
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      description:
        'Add a combination of images and videos to create a hero. If you add multiple items, they will be displayed as a slideshow.',
      of: [{ type: 'module.image' }, { type: 'module.video' }],
    }),
  ],
})
