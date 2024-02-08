import {
  PortableText,
  type PortableTextReactComponents,
} from '@portabletext/react'

import { SanityImage } from './SanityImage'

const myPortableTextComponents: Partial<PortableTextReactComponents> = {
  types: {
    image: ({ value }) => {
      return <SanityImage {...value} />
    },
  },
}

export default function ContentBody({ content }) {
  return (
    <div className={`mx-auto max-w-2xl`}>
      <PortableText value={content} components={myPortableTextComponents} />
    </div>
  )
}
