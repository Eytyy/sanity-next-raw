import { LinkIcon } from '@sanity/icons'
import { defineField } from 'sanity'

import { CONTENT_REFERENCES } from '@/studio/constants'

export default defineField({
  title: 'Content Link',
  name: 'linkContent',
  type: 'object',
  icon: LinkIcon,
  fields: [
    // Title
    {
      title: 'Title',
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    // Reference
    {
      name: 'reference',
      type: 'reference',
      weak: true,
      validation: (Rule) => Rule.required(),
      to: CONTENT_REFERENCES,
    },
  ],
  preview: {
    select: {
      reference: 'reference',
      referenceTitle: 'reference.title',
      referenceType: 'reference._type',
      title: 'title',
    },
    prepare(selection) {
      const { reference, referenceTitle, title } = selection

      let subtitle = []
      if (reference) {
        subtitle.push([`→ ${referenceTitle || reference?._id}`])
      } else {
        subtitle.push('(Nonexistent document reference)')
      }

      return {
        // media: image,
        subtitle: subtitle.join(' '),
        title,
      }
    },
  },
})
