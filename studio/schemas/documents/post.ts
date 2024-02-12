import { format, parseISO } from 'date-fns'
import { MdTextSnippet } from 'react-icons/md'
import { defineField, defineType } from 'sanity'

import { defineImageField } from '../utils'
import artistType from './artist'
import authorType from './author'
import postCategoryType from './postCategory'

export default defineType({
  name: 'post',
  title: 'Post',
  icon: MdTextSnippet,
  type: 'document',
  groups: [
    { title: 'Content', name: 'content', default: true },
    { title: 'SEO & Social', name: 'seo' },
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
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      group: 'content',
      validation: (Rule) =>
        Rule.custom((url, context) => {
          if (context.document.postType === 'internal' && !url) {
            return 'Excerpt is required for internal posts'
          }
          return true
        }),
    }),
    defineImageField({
      name: 'coverImage',
      title: 'Cover Image',
      group: 'content',
    }),
    defineField({
      name: 'artist',
      title: 'Artist',
      type: 'reference',
      to: [{ type: artistType.name }],
      group: 'content',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: postCategoryType.name }] }],
      group: 'content',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
      group: 'content',
    }),
    defineField({
      name: 'variant',
      title: 'Variant',
      type: 'string',
      options: {
        layout: 'radio',
        direction: 'horizontal',
        list: [
          { title: 'Internal Article', value: 'internal' },
          { title: 'External Article', value: 'external' },
        ],
      },
      initialValue: 'internal',
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'externalUrl',
      title: 'External Article URL',
      type: 'url',
      hidden: ({ parent }) => parent?.variant !== 'external',
      validation: (Rule) =>
        Rule.custom((url, context) => {
          if (context.document.postType === 'external' && !url) {
            return 'URL is required for external posts'
          }
          return true
        }),
      group: 'content',
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      hidden: ({ parent }) => parent?.variant !== 'internal',
      group: 'content',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'advancedBody',
      hidden: ({ parent }) => parent?.variant !== 'internal',
      group: 'content',
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: authorType.name }] }],
      hidden: ({ parent }) => parent?.variant !== 'internal',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      hidden: ({ parent }) => parent?.variant !== 'internal',
      validation: (Rule) =>
        Rule.custom((slug, context) => {
          if (context.document.variant === 'internal' && !slug) {
            return 'Slug is required for internal posts'
          }
          return true
        }),
      group: 'content',
    }),
    defineField({
      name: 'meta',
      title: 'Meta',
      type: 'meta',
      group: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      date: 'date',
      media: 'coverImage',
    },
    prepare({ title, media, author, date }) {
      const subtitles = [
        author && `by ${author}`,
        date && `on ${format(parseISO(date), 'LLL d, yyyy')}`,
      ].filter(Boolean)

      return { title, media, subtitle: subtitles.join(' ') }
    },
  },
})
