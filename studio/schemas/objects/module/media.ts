import { EyeOpenIcon } from '@sanity/icons'
import pluralize from 'pluralize-esm'
import { defineField } from 'sanity'

export default defineField({
  name: 'module.media',
  title: 'Media',
  type: 'object',
  icon: EyeOpenIcon,
  fields: [
    defineField({
      name: 'variant',
      title: 'Variant',
      type: 'string',
      options: {
        layout: 'radio',
        direction: 'horizontal',
        list: [
          { title: 'Grid', value: 'grid' },
          { title: 'Slider', value: 'slider' },
        ],
      },
      initialValue: 'slider',
    }),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [
        { type: 'module.image' },
        { type: 'module.video' },
        { type: 'module.youtube' },
      ],
      validation: (Rule) => Rule.min(3).required(),
    }),
  ],
  preview: {
    select: {
      items: 'items',
      variant: 'variant',
    },
    prepare(selection) {
      const { items, variant } = selection
      return {
        subtitle: `Media ${variant}`,
        title:
          items && items.length > 0
            ? pluralize('item', items.length, true)
            : 'No items',
        media: EyeOpenIcon,
      }
    },
  },
})
