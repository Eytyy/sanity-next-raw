import { MdTextFields } from 'react-icons/md'
import { defineArrayMember, defineField } from 'sanity'

export default defineField({
  name: 'module.form',
  title: 'Form',
  type: 'object',
  icon: MdTextFields,
  fields: [
    defineField({
      name: 'fields',
      title: 'Fields',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'field',
          title: 'Field',
          type: 'module.form.field',
        }),
      ],
    }),
  ],
})
