import { ImageIcon } from '@sanity/icons'
import { defineField } from 'sanity'

export const defineImageField = (props?: {
  name?: string
  title?: string
  required?: boolean
  withCaption?: boolean
  group?: string
}) =>
  defineField({
    name: props?.name ?? 'image',
    title: props?.title ?? 'Image',
    type: 'image',
    icon: ImageIcon,
    options: {
      hotspot: true,
    },
    fields: [
      defineField({
        name: 'alt',
        type: 'string',
        title: 'Alternative text',
        description: 'Important for SEO and accessiblity.',
      }),
      ...(props?.withCaption
        ? [
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
          ]
        : []),
    ],
    ...(props?.required ? { validation: (Rule) => Rule.required() } : {}),
    ...(props?.group ? { group: props.group } : {}),
  })

export const defineSlugField = (props?: { source?: string }) =>
  defineField({
    name: 'slug',
    title: 'Slug',
    type: 'slug',
    options: {
      source: props?.source ?? 'title',
      maxLength: 96,
      isUnique: (value, context) => context.defaultIsUnique(value, context),
    },
    validation: (rule) => rule.required(),
  })
