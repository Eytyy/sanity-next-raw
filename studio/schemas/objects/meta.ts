import { ShareIcon } from '@sanity/icons'
import { defineArrayMember, defineField } from 'sanity'

export default defineField({
  title: 'Meta',
  name: 'meta',
  type: 'object',
  icon: ShareIcon,
  fields: [
    defineField({
      name: 'description',
      description:
        'Used for the <meta> description tag for SEO. Should be between 70 and 155 characters.',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (Rule) =>
        Rule.custom((content, { document }) => {
          if (document?.variant && document.variant === 'internal') {
            if (content && content.length > 155) {
              return 'Description should be less than 155 characters'
            }
          }
          return true
        }).max(160),
      hidden: ({ document }) =>
        document?.variant && document.variant === 'external',
    }),
    {
      title: 'Overide Open Graph Image',
      name: 'overrideOGImage',
      type: 'boolean',
      description: 'Override the default open graph image with a custom image',
      initialValue: false,
      hidden: ({ document }) =>
        document?.variant && document.variant === 'external',
    },
    {
      title: 'Open Graph Image',
      name: 'ogImage',
      type: 'image',
      description:
        'Image to be used when sharing on social media. Recommended size: 1200x630px',
      hidden: ({ parent, document }) =>
        !parent?.overrideOGImage ||
        (document?.variant && document.variant === 'external'),
    },
  ],
})
