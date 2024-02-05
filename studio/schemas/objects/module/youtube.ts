import { DocumentVideoIcon } from '@sanity/icons'
import { defineField } from 'sanity'

export default defineField({
  name: 'module.youtube',
  title: 'Youtube Video',
  type: 'object',
  icon: DocumentVideoIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
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
    defineField({
      name: 'autoplay',
      title: 'Autoplay',
      type: 'boolean',
      description: 'The video will start playing automatically when visible.',
      initialValue: false,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'loop',
      title: 'Loop',
      type: 'boolean',
      description: 'The video will start over when it ends.',
      initialValue: false,
      hidden: ({ parent }) => !parent?.autoplay,
      validation: (Rule) => Rule.required(),
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
