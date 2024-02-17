import { MdTextFields } from 'react-icons/md'
import { defineField } from 'sanity'

export default defineField({
  name: 'module.form.email',
  title: 'Email',
  type: 'object',
  icon: MdTextFields,
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      initialValue: 'Email',
      // readOnly: true,
      // hidden: true,
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      initialValue: 'email',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'type',
      type: 'string',
      title: 'Type',
      icon: MdTextFields,
      initialValue: 'email',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'required',
      title: 'Required',
      type: 'boolean',
      initialValue: true,
      description: 'Is this field required?',
      readOnly: true,
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
        subtitle: `Default Field - ${subtitle}`,
      }
    },
  },
})
