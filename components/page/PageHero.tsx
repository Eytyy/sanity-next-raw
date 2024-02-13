import Module from '@/components/modules'
import MediaSlider from '@/components/modules/media/Slider'

import { MediaConfig } from '../modules/types'
import type { LandingPageProps } from './Landing'

const mediaConfig: MediaConfig = {
  maxWidth: 2000,
  background: true,
  objectFit: 'contain',
}

export default function PageHero(props: LandingPageProps['page']['hero']) {
  const content = props?.content
  if (!content) return null
  if (content.length > 1) {
    return <MediaSlider items={content} mediaConfig={mediaConfig} />
  }
  return <Module module={content[0]} mediaConfig={mediaConfig} />
}
