import React from 'react'

import ReferencedContent from './ReferencedContent'
import type { ModuleProps } from './types'

export default function Module({ module }: { module: ModuleProps }) {
  switch (module._type) {
    case 'module.posts':
    case 'module.artists':
    case 'module.artworks':
      return <ReferencedContent {...module} />
    default:
      return null
  }
}
