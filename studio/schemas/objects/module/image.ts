import { ImageIcon } from '@sanity/icons'
import { defineField } from 'sanity'

export default defineField({
  name: 'module.image',
  title: 'Image',
  type: 'object',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'alt',
      type: 'string',
      title: 'Alternative text',
      description: 'Important for SEO and accessiblity.',
    }),
    defineField({
      name: 'addCaption',
      title: 'Add caption?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'text',
      rows: 2,
      hidden: ({ parent }) => !parent?.addCaption,
    }),
    defineField({
      name: 'addTextOverlay',
      title: 'Add text overlay?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'textOverlay',
      title: 'Text overlay',
      type: 'text',
      rows: 3,
      hidden: ({ parent }) => !parent?.addTextOverlay,
    }),
    defineField({
      name: 'addCTA',
      title: 'Add call to action?',
      type: 'boolean',
      initialValue: false,
      hidden: ({ parent }) => !parent?.addTextOverlay,
    }),
    defineField({
      name: 'cta',
      title: 'Call To Action',
      type: 'array',
      of: [
        { type: 'linkInternal' },
        {
          type: 'linkExternal',
        },
      ],
      validation: (Rule) =>
        Rule.custom((content, { document }) => {
          if (document.addCTA && content.length !== 1) {
            return 'Please add exactly 1 call to action'
          }
          return true
        }),
      hidden: ({ parent }) => !parent?.addTextOverlay && !parent?.addCTA,
    }),
  ],
  preview: {
    select: {
      fileName: 'image.asset.originalFilename',
      image: 'image',
      alt: 'alt',
    },
    prepare(selection) {
      const { fileName, image, alt } = selection

      return {
        media: image,
        title: fileName,
        subtitle: alt ?? 'No alternative text, please add some.',
      }
    },
  },
})
