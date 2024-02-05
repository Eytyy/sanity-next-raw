import { useInView } from 'framer-motion'
import React from 'react'
import { MdPlayArrow } from 'react-icons/md'

import { cn } from '@/lib/utils'

import { VideoModuleProps } from '../types'
import BigButton from './BigButton'
import VideoControls from './Controls'
import VideoPorgressBar from './PorgressBar'
import VideoPoster from './Poster'

interface VideoProps extends VideoModuleProps {
  background?: boolean
}

type State = {
  playing: boolean
  playedOnce: boolean
  muted: boolean
  progress: number
}

const initialState: State = {
  playing: false,
  playedOnce: false,
  muted: false,
  progress: 0,
}

type Action =
  | { type: 'UPDATE_PROGRESS'; payload: number }
  | { type: 'PLAY' }
  | { type: 'PAUSE' }
  | { type: 'TOGGLE_MUTE'; payload: boolean }
  | { type: 'REPLAY' }

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'PLAY':
      return { ...state, playing: true, playedOnce: true }
    case 'PAUSE':
      return { ...state, playing: false }
    case 'TOGGLE_MUTE':
      return { ...state, muted: !state.muted }
    case 'REPLAY':
      return { ...state, playing: true }
    case 'UPDATE_PROGRESS':
      return { ...state, progress: action.payload }
    default:
      return state
  }
}

const initializeState = ({ autoplay }: { autoplay: boolean }): State => {
  return {
    ...initialState,
    muted: autoplay,
  }
}

export default function VideoPlayer({
  src,
  cover,
  autoplay = false,
  background = false,
  layout = 'landscape',
  loop = false,
}: VideoProps) {
  const ref = React.useRef<HTMLVideoElement>(null)
  const [state, setState] = React.useReducer(
    reducer,
    { autoplay },
    initializeState,
  )
  const inView = useInView(ref, {
    amount: 'all',
  })

  const playVideo = React.useCallback(() => {
    if (ref.current) {
      ref.current.play()
      setState({ type: 'PLAY' })
    }
  }, [])

  const pauseVideo = React.useCallback(() => {
    if (ref.current) {
      ref.current.pause()
      setState({ type: 'PAUSE' })
    }
  }, [])

  const toggleMute = React.useCallback(() => {
    if (ref.current) {
      ref.current.muted = !ref.current.muted
      setState({
        type: 'TOGGLE_MUTE',
        payload: ref.current.muted,
      })
    }
  }, [])

  const replayVideo = React.useCallback(() => {
    if (ref.current) {
      ref.current.currentTime = 0
      ref.current.play()
      setState({ type: 'REPLAY' })
    }
  }, [])

  const updateProgress = React.useCallback(() => {
    if (ref.current) {
      const progress = (ref.current.currentTime / ref.current.duration) * 100
      setState({ type: 'UPDATE_PROGRESS', payload: progress })
    }
  }, [ref])

  const onSeek = (seekTime: number) => {
    ref.current.currentTime = seekTime
  }

  // Auto play/pause when inView changes
  React.useEffect(() => {
    if (autoplay && ref.current && ref.current.paused && inView) {
      playVideo()
    } else if (autoplay && ref.current && !ref.current.paused && !inView) {
      pauseVideo()
    }
  }, [autoplay, inView, playVideo, pauseVideo])

  const { playing, playedOnce, muted, progress } = state
  return (
    <div
      className={cn(
        'bg-black shadow-medium',
        layout === 'square' && 'max-w-[calc(100vh-10rem)] mx-auto',
        background
          ? 'absolute top-1/2 left-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2'
          : 'relative overflow-hidden',
      )}
    >
      <video
        ref={ref}
        src={src}
        className={cn(background ? 'h-full w-full z-20' : 'h-auto w-full')}
        onEnded={pauseVideo}
        onTimeUpdate={updateProgress}
        autoPlay={autoplay && inView}
        muted={muted}
        loop={loop}
        playsInline={autoplay}
        preload={autoplay ? 'auto' : 'none'}
      />
      <VideoPorgressBar
        duration={ref.current?.duration || 0}
        progress={progress}
        onSeek={onSeek}
      />

      {cover && !playing && (
        <VideoPoster
          sizes="(max-width: 480px) 100vw, 33vw"
          image={cover}
          maxWidth={2000}
          layout={layout}
        />
      )}
      {!playedOnce && !playing && (
        <BigButton onClick={playVideo}>
          <MdPlayArrow />
        </BigButton>
      )}
      {playedOnce && (
        <VideoControls
          muted={muted}
          playing={playing}
          onPause={pauseVideo}
          onPlay={playVideo}
          onToggleMute={toggleMute}
          onReplay={replayVideo}
        />
      )}
    </div>
  )
}
