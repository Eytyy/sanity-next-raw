import {
  PortableText,
  type PortableTextReactComponents,
} from '@portabletext/react'

import ImageWithCaption from '../shared/ImageWithCaption'
import styles from './PostBody.module.css'

const myPortableTextComponents: Partial<PortableTextReactComponents> = {
  types: {
    'module.image': ({ value }) => <ImageWithCaption {...value} />,
  },
}

export default function PostBody({ content }) {
  return (
    <div className={`mx-auto max-w-2xl ${styles.portableText}`}>
      <PortableText value={content} components={myPortableTextComponents} />
    </div>
  )
}
