import { DocumentVideoIcon } from '@sanity/icons'
import { defineField } from 'sanity'

export default defineField({
  name: 'module.youtube',
  title: 'Youtube Video',
  type: 'object',
  icon: DocumentVideoIcon,
  fields: [
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: (Rule) => {
        return Rule.uri({
          scheme: ['https'],
        })
      },
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
      description: 'Image displayed before the video plays.',
    }),
  ],
  preview: {
    select: {
      url: 'url',
      image: 'image',
    },
    prepare(selection) {
      const { url, image } = selection

      return {
        media: image,
        title: url,
      }
    },
  },
})
