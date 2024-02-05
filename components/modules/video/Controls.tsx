import React from 'react'
import {
  MdPause,
  MdPlayArrow,
  MdReplay,
  MdVolumeOff,
  MdVolumeUp,
} from 'react-icons/md'

import SmallButton from './SmallButton'

type Props = {
  muted: boolean
  playing: boolean
  onPlay: () => void
  onPause: () => void
  onToggleMute: () => void
  onReplay: () => void
}

export default function VideoControls({
  muted,
  playing,
  onPlay,
  onPause,
  onToggleMute,
  onReplay,
}: Props) {
  return (
    <div className="absolute bottom-4 right-4 flex items-center justify-center gap-4 z-20">
      {playing ? (
        <SmallButton onClick={onPause}>
          <MdPause />
        </SmallButton>
      ) : (
        <SmallButton onClick={onPlay}>
          <MdPlayArrow />
        </SmallButton>
      )}
      <SmallButton onClick={onReplay}>
        <MdReplay />
      </SmallButton>
      <SmallButton onClick={onToggleMute}>
        {muted ? <MdVolumeOff /> : <MdVolumeUp />}
      </SmallButton>
    </div>
  )
}
