import {
  PortableText,
  type PortableTextReactComponents,
} from '@portabletext/react'

import BodyImage from '../shared/BodyImage'
import styles from './PostBody.module.css'

const myPortableTextComponents: Partial<PortableTextReactComponents> = {
  types: {
    image: ({ value }) => <BodyImage {...value} />,
    'module.image': ({ value }) => <BodyImage {...value} />,
  },
}

export default function PostBody({ content }) {
  return (
    <div className={`mx-auto max-w-2xl ${styles.portableText}`}>
      <PortableText value={content} components={myPortableTextComponents} />
    </div>
  )
}
