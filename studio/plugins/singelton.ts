import { definePlugin } from 'sanity'

export const singletonPlugin = definePlugin<{ types: string[] }>(
  ({ types }) => {
    return {
      name: 'singleton',
      document: {
        // Hide 'Singletons' from new document options
        newDocumentOptions: (prev, { creationContext }) => {
          if (creationContext.type === 'global') {
            return prev.filter(
              (templateItem) => !types.includes(templateItem.templateId),
            )
          }
          return prev
        },
        // Removes the "duplicate" action on singleton documents
        actions: (prev, { schemaType }) => {
          if (types.includes(schemaType)) {
            return prev.filter(
              ({ action }) =>
                !['unpublish', 'duplicate', 'delete', 'duplicate'].includes(
                  action,
                ),
            )
          }
          return prev
        },
      },
    }
  },
)
