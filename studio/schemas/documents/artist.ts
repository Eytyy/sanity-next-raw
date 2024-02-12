import { MdOutlinePerson } from 'react-icons/md'
import { defineField, defineType } from 'sanity'

import { defineImageField, defineSlugField } from '../utils'

export default defineType({
  name: 'artist',
  title: 'Artist',
  icon: MdOutlinePerson,
  type: 'document',
  groups: [
    { title: 'Content', name: 'content', default: true },
    { title: 'SEO & Social', name: 'seo' },
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
      group: 'content',
    }),
    defineImageField({
      name: 'coverImage',
      title: 'Cover Image',
      required: true,
      group: 'content',
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'module.media',
      group: 'content',
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'body',
      group: 'content',
    }),
    defineField({
      name: 'meta',
      title: 'Meta',
      type: 'meta',
      group: 'seo',
    }),
    defineSlugField({ source: 'name' }),
  ],
})
