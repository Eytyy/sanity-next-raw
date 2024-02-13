import React from 'react'

import ImageModule from './Image'
import MediaModule from './media'
import ReferencedContent from './ReferencedContent'
import TextModule from './text'
import type { MediaConfig, ModuleProps } from './types'
import Video from './video/Player'
import YoutubeVideo from './video/YoutubeVideo'

export default function Module({
  module,
  mediaConfig,
}: {
  module: ModuleProps
  mediaConfig?: MediaConfig
}) {
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
      return <MediaModule {...module} mediaConfig={mediaConfig} />
    case 'module.image':
      return <ImageModule {...module} mediaConfig={mediaConfig} />
    case 'module.body':
      return <TextModule {...module} />
    default:
      console.log('Module type not supported')
      return null
  }
}
