import { CogIcon } from '@sanity/icons'
import * as demo from 'lib/demo.data'
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  icon: CogIcon,
  groups: [
    {
      title: 'Info',
      name: 'info',
      default: true,
    },
    {
      title: 'Menu',
      name: 'menu',
    },
  ],
  preview: {
    prepare: () => ({
      title: 'Settings',
    }),
  },
  // Uncomment below to have edits publish automatically as you type
  // liveEdit: true,
  fields: [
    defineField({
      title: 'Menu',
      name: 'menu',
      type: 'array',
      of: [
        { type: 'linkExternal' },
        { type: 'linkContent' },
        { type: 'linkInternal', title: 'Page Link' },
      ],
      group: 'menu',
    }),
    defineField({
      name: 'title',
      description: 'This field is the title of your website.',
      title: 'Title',
      type: 'string',
      initialValue: demo.title,
      validation: (rule) => rule.required(),
      group: 'info',
    }),
    defineField({
      name: 'description',
      description:
        'Used both for the <meta> description tag for SEO, and the blog subheader.',
      title: 'Description',
      type: 'array',
      initialValue: demo.description,
      of: [
        defineArrayMember({
          type: 'block',
          options: {},
          styles: [],
          lists: [],
          marks: {
            decorators: [],
            annotations: [
              defineField({
                type: 'object',
                name: 'link',
                fields: [
                  {
                    type: 'string',
                    name: 'href',
                    title: 'URL',
                    validation: (rule) => rule.required(),
                  },
                ],
              }),
            ],
          },
        }),
      ],
      validation: (rule) => rule.max(155).required(),
      group: 'info',
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      description:
        'Used for social media previews when linking to the index page.',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
      group: 'info',
    }),
  ],
})
