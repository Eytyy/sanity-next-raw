import React from 'react'

import { MediaModuleProps } from '../types'
import MediaGrid from './Grid'
import MediaSlider from './Slider'

export default function MediaModule({ variant, ...module }: MediaModuleProps) {
  switch (variant) {
    case 'slider':
      return <MediaSlider items={module.items} />
    case 'grid':
      return <MediaGrid items={module.items} />
    default:
      return <div>Module type not supported: {variant}</div>
  }
}
