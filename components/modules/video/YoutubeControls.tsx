import React from 'react'
import { MdPause, MdReplay, MdVolumeOff, MdVolumeUp } from 'react-icons/md'

import SmallButton from './SmallButton'

type Props = {
  muted: boolean
  onPlay: () => void
  onPause: () => void
  onToggleMute: () => void
  onReplay: () => void
}

export default function YoutubeVideoControls({
  muted,
  onPause,
  onToggleMute,
  onReplay,
}: Props) {
  return (
    <div className="backdrop-blur-md absolute bottom-4 right-4 flex items-center justify-center gap-4 z-20">
      <SmallButton onClick={onPause}>
        <MdPause />
      </SmallButton>
      <SmallButton onClick={onReplay}>
        <MdReplay />
      </SmallButton>
      <SmallButton onClick={onToggleMute}>
        {muted ? <MdVolumeOff /> : <MdVolumeUp />}
      </SmallButton>
    </div>
  )
}
