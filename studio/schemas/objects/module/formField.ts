import { MdTextFields } from 'react-icons/md'
import { defineField } from 'sanity'

export default defineField({
  name: 'module.form.field',
  title: 'Field',
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
      name: 'name',
      title: 'Name',
      type: 'string',
      description:
        'The name of the field, used for the form submission. Lowercase and no spaces.',
      validation: (Rule) =>
        Rule.required().custom((content) => {
          if (content !== content.toLowerCase()) {
            return 'Name should be lowercase'
          }
          if (content.includes(' ')) {
            return 'Name should not contain spaces, use dashes instead'
          }
          return true
        }),
    }),
    defineField({
      name: 'type',
      type: 'string',
      title: 'Type',
      icon: MdTextFields,
      options: {
        list: [
          { title: 'Text', value: 'text' },
          { title: 'Email', value: 'email' },
          { title: 'Textarea', value: 'textarea' },
          { title: 'Checkbox', value: 'checkbox' },
          { title: 'Radio', value: 'radio' },
          { title: 'Select', value: 'select' },
        ],
      },
      validation: (Rule) => Rule.required(),
      initialValue: 'text',
    }),
    defineField({
      name: 'placeholder',
      title: 'Placeholder',
      type: 'string',
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
      description: 'Only used for radio and select types',
      hidden: ({ parent }) =>
        parent?.type !== 'radio' && parent?.type !== 'select',
      validation: (Rule) =>
        Rule.custom((content, { parent }: any) => {
          if (
            (parent.type === 'radio' || parent.type === 'select') &&
            content.length < 2
          ) {
            return 'Please add at least 2 options'
          }
          return true
        }),
    }),
  ],
})
