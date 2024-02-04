import { defineField } from 'sanity'

import { defineImageField } from '../../utils'

export default defineField({
  name: 'hero.home',
  title: 'Home hero',
  type: 'object',
  fields: [
    defineField({
      name: 'variant',
      title: 'Variant',
      type: 'string',
      description: 'Choose the layout variant for the hero.',
      options: {
        layout: 'radio',
        direction: 'horizontal',
        list: [
          { title: 'Default', value: 'default' },
          { title: 'Slider', value: 'slider' },
          { title: 'Grid', value: 'grid' },
        ],
      },
      initialValue: 'single',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        { type: 'module.image' },
        { type: 'module.video' },
        {
          name: 'post',
          type: 'reference',
          title: 'Featured Post',
          to: [{ type: 'post' }],
        },
        {
          name: 'artist',
          type: 'reference',
          title: 'Featured Aritst',
          to: [{ type: 'artist' }],
        },
        {
          name: 'artwork',
          type: 'reference',
          title: 'Featured Artwork',
          to: [{ type: 'artwork' }],
        },
      ],
      validation: (Rule) =>
        Rule.custom((content, { document }) => {
          const {
            variant,
          }: {
            variant: 'default' | 'slider' | 'grid'
          } = document.hero as any

          if (variant === 'default' && content.length > 1) {
            return 'Only one item allowed for default variant. Either change the variant or remove items.'
          }
          if (
            variant === 'grid' &&
            (content.length < 3 || content.length > 3)
          ) {
            return 'Exactly three items required for grid variant. Either change the variant or add/remove items.'
          }
          if (variant === 'default' && content.length === 0) {
            return 'Add an item for default variant.'
          }
          if (variant === 'slider' && content.length < 2) {
            return 'Add at least two items for slider variant.'
          }
          return true
        }),
    }),
  ],
})
