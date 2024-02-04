import { DocumentVideoIcon } from '@sanity/icons'
import { defineField } from 'sanity'

export default defineField({
  name: 'module.video',
  title: 'Video',
  type: 'object',
  icon: DocumentVideoIcon,
  fields: [
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
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
      description: 'Image displayed before the video plays.',
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
