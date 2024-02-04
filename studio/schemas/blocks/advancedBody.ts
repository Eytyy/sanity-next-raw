import { defineField } from 'sanity'

export default defineField({
  name: 'advancedBody',
  title: 'Body',
  type: 'array',
  of: [
    {
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'Quote', value: 'blockquote' },
      ],
    },
    { type: 'module.image' },
    { type: 'module.video' },
    { type: 'module.youtube' },
    { type: 'module.media' },
  ],
})
