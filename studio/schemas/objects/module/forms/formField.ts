import { MdTextFields } from 'react-icons/md'
import { defineField } from 'sanity'

export default defineField({
  name: 'module.form.customField',
  title: 'Custom Field',
  type: 'object',
  icon: MdTextFields,
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      type: 'string',
      title: 'Type',
      icon: MdTextFields,
      options: {
        list: [
          { title: 'Input', value: 'input' },
          { title: 'Textarea', value: 'textarea' },
          { title: 'Select', value: 'select' },
          { title: 'Radio', value: 'radio' },
        ],
      },
      validation: (Rule) => Rule.required(),
      initialValue: 'input',
    }),
    defineField({
      name: 'required',
      title: 'Required',
      type: 'boolean',
    }),
    defineField({
      name: 'options',
      title: 'Options',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Only used for select and radio fields',
      hidden: ({ parent }) =>
        parent?.type !== 'select' && parent?.type !== 'radio',
      validation: (Rule) =>
        Rule.custom((content, { parent }: any) => {
          if (
            (parent.type === 'select' || parent.type === 'radio') &&
            content.length < 2
          ) {
            return 'Please add at least 2 options'
          }
          return true
        }),
    }),
  ],
  preview: {
    select: {
      title: 'label',
      subtitle: 'type',
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle: `Custom Field - ${subtitle}`,
      }
    },
  },
})
