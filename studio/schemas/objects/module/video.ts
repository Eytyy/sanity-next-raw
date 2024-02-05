import { DocumentVideoIcon } from '@sanity/icons'
import { defineField } from 'sanity'

export default defineField({
  name: 'module.video',
  title: 'Video',
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
      name: 'video',
      title: 'Video',
      type: 'file',
      options: {
        accept: 'video/mp4',
        storeOriginalFilename: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
      description: 'Image displayed before the video plays.',
    }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Landscape', value: 'landscape' },
          { title: 'Square', value: 'square' },
          { title: 'Portrait', value: 'portrait' },
        ],
      },
      validation: (Rule) => Rule.required(),
      description: 'The aspect ratio of the video.',
      initialValue: 'landscape',
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
      fileName: 'video.asset.originalFilename',
      image: 'image',
    },
    prepare(selection) {
      const { fileName, image } = selection

      return {
        media: image,
        title: fileName,
      }
    },
  },
})
