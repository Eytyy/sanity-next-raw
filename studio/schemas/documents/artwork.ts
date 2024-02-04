import { RocketIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

import { defineImageField, defineSlugField } from '../utils'

export default defineType({
  name: 'artwork',
  title: 'Artwork',
  icon: RocketIcon,
  type: 'document',
  fields: [
    defineImageField({
      name: 'coverImage',
      title: 'Cover image',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'artist',
      title: 'Artist',
      type: 'reference',
      to: [{ type: 'artist' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      options: { dateFormat: 'YYYY' },
      initialValue: () => new Date().toISOString().split('T')[0],
    }),
    defineField({
      name: 'source',
      title: 'Source',
      type: 'linkExternal',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'addGallery',
      title: 'Add Gallery?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'module.media',
      hidden: ({ parent }) => !parent?.addGallery,
    }),
    defineSlugField({ source: 'title' }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'coverImage',
    },
    prepare({ title, media }) {
      return { title, media }
    },
  },
})
