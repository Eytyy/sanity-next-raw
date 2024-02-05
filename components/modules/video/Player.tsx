import { useInView } from 'framer-motion'
import React from 'react'
import { MdPlayArrow } from 'react-icons/md'

import { cn } from '@/lib/utils'

import { VideoModuleProps } from '../types'
import BigButton from './BigButton'
import VideoControls from './Controls'
import VideoPorgressBar from './PorgressBar'
import VideoPoster from './Poster'
import useVideo from './useVideo'

interface VideoProps extends VideoModuleProps {
  background?: boolean
}

export default function VideoPlayer({
  src,
  cover,
  autoplay = false,
  background = false,
  layout = 'landscape',
  loop = false,
}: VideoProps) {
  const { state, dispatch } = useVideo(autoplay)
  const ref = React.useRef<HTMLVideoElement>(null)

  const inView = useInView(ref, {
    amount: 'all',
  })

  const playVideo = React.useCallback(() => {
    if (ref.current) {
      ref.current.play()
      dispatch({ type: 'PLAY' })
    }
  }, [dispatch])

  const pauseVideo = React.useCallback(() => {
    if (ref.current) {
      ref.current.pause()
      dispatch({ type: 'PAUSE' })
    }
  }, [dispatch])

  const toggleMute = React.useCallback(() => {
    if (ref.current) {
      ref.current.muted = !ref.current.muted
      dispatch({
        type: 'TOGGLE_MUTE',
        payload: ref.current.muted,
      })
    }
  }, [dispatch])

  const replayVideo = React.useCallback(() => {
    if (ref.current) {
      ref.current.currentTime = 0
      ref.current.play()
      dispatch({ type: 'REPLAY' })
    }
  }, [dispatch])

  const updateProgress = React.useCallback(() => {
    if (ref.current) {
      const progress = (ref.current.currentTime / ref.current.duration) * 100
      dispatch({ type: 'UPDATE_PROGRESS', payload: progress })
    }
  }, [ref, dispatch])

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
