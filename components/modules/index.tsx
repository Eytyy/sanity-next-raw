import React from 'react'

import ImageModule from './Image'
import MediaModule from './media'
import ReferencedContent from './ReferencedContent'
import type { ModuleProps } from './types'
import Video from './video/Player'
import YoutubeVideo from './video/YoutubeVideo'

export default function Module({ module }: { module: ModuleProps }) {
  switch (module._type) {
    case 'module.posts':
    case 'module.artists':
    case 'module.artworks':
      return <ReferencedContent {...module} />
    case 'module.video':
      return <Video {...module} />
    case 'module.youtube':
      return <YoutubeVideo {...module} />
    case 'module.media':
      return <MediaModule {...module} />
    case 'module.image':
      return <ImageModule {...module} />
    default:
      console.log('Module type not supported')
      return null
  }
}
