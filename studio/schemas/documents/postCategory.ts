import { ColorWheelIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

import { defineSlugField } from '../utils'
export default defineType({
  name: 'postCategory',
  title: 'Post Category',
  icon: ColorWheelIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineSlugField({
      source: 'title',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})
