import { MdTextFields } from 'react-icons/md'
import { defineArrayMember, defineField } from 'sanity'

export default defineField({
  name: 'module.form',
  title: 'Form',
  type: 'object',
  icon: MdTextFields,
  fields: [
    defineField({
      name: 'from',
      title: 'From',
      type: 'string',
      description:
        'Email address to send form submissions from. i.e. Business Name contact@email.com',
    }),
    defineField({
      name: 'to',
      title: 'To',
      type: 'url',
      validation: (Rule) => Rule.uri({ scheme: ['mailto'] }),
      description:
        'Email address to send form submissions to. i.e. contact@email.com',
    }),
    defineField({
      name: 'subject',
      title: 'Subject',
      type: 'string',
      description:
        'Subject line for form submissions. i.e. Contact Form Submission',
    }),
    defineField({
      type: 'object',
      name: 'fields',
      title: 'Fields',
      fields: [
        defineField({
          title: 'Email',
          name: 'emailField',
          type: 'module.form.email',
          options: {
            collapsible: false,
          },
        }),
        defineField({
          title: 'Name',
          name: 'nameField',
          type: 'module.form.name',
          options: {
            collapsible: false,
          },
        }),
        defineField({
          title: 'Main Message',
          name: 'messageField',
          type: 'module.form.message',
          options: {
            collapsible: false,
          },
        }),
        defineField({
          name: 'customFields',
          title: 'Custom Fields',
          type: 'array',
          of: [
            defineArrayMember({
              name: 'customField',
              type: 'module.form.customField',
            }),
          ],
        }),
      ],
    }),
  ],
})
