import { useInView } from 'framer-motion'
import getYouTubeId from 'get-youtube-id'
import React, { use, useCallback } from 'react'
import { MdPlayArrow } from 'react-icons/md'
import YouTube, { type YouTubePlayer, type YouTubeProps } from 'react-youtube'

import { YoutubeModuleProps } from '../types'
import BigButton from './BigButton'
import VideoPorgressBar from './PorgressBar'
import VideoPoster from './Poster'
import useVideo from './useVideo'
import YoutubeVideoControls from './YoutubeControls'

export default function YoutubeVideo({
  src,
  cover,
  loop,
  autoplay,
}: YoutubeModuleProps) {
  const ref = React.useRef(null)
  const { state, dispatch } = useVideo(autoplay)
  const { playing, muted, progress } = state

  const [player, setPlayer] = React.useState<YouTubePlayer | null>(null)
  const id = getYouTubeId(src)
  const invView = useInView(ref, {
    amount: 0.9,
  })
  const opts: YouTubeProps['opts'] = {
    height: '390',
    width: '640',
    playerVars: {
      loop: loop ? 1 : 0,
      enablejsapi: 1,
      playsinline: 1,
      controls: 0,
    },
  }
  const playVideo = useCallback(() => {
    if (player) {
      player.playVideo()
      dispatch({ type: 'PLAY' })
    }
  }, [player, dispatch])

  const toggleMute = useCallback(() => {
    if (player) {
      if (player.isMuted()) {
        player.unMute()
        dispatch({ type: 'TOGGLE_MUTE', payload: false })
      } else {
        player.mute()
        dispatch({ type: 'TOGGLE_MUTE', payload: true })
      }
    }
  }, [player, dispatch])

  const replayVideo = useCallback(() => {
    if (player) {
      player.seekTo(0)
      player.playVideo()
      dispatch({ type: 'REPLAY' })
    }
  }, [player, dispatch])

  const pauseVideo = useCallback(() => {
    if (player) {
      player.pauseVideo()
      dispatch({ type: 'PAUSE' })
    }
  }, [player, dispatch])

  React.useEffect(() => {
    if (invView && autoplay) {
      playVideo()
    } else {
      pauseVideo()
    }
  }, [invView, autoplay, playVideo, pauseVideo])

  const onSeek = useCallback(
    (seekTime: number) => {
      if (player) {
        player.seekTo(seekTime, true)
      }
    },
    [player],
  )

  // check progress
  React.useEffect(() => {
    if (player) {
      const interval = setInterval(() => {
        const progress = (player.getCurrentTime() / player.getDuration()) * 100
        dispatch({ type: 'UPDATE_PROGRESS', payload: progress })
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [player, dispatch])

  return (
    <div ref={ref} className="relative">
      <YouTube
        videoId={id}
        iframeClassName="aspect-video w-full h-auto"
        opts={opts}
        onPlay={playVideo}
        onPause={pauseVideo}
        onReady={(e) => setPlayer(e.target)}
      />
      <VideoPorgressBar
        duration={player ? player.getDuration() : 0}
        progress={progress}
        onSeek={onSeek}
      />
      {cover && !playing && (
        <VideoPoster
          sizes="(max-width: 480px) 100vw, 33vw"
          image={cover}
          maxWidth={2000}
          layout="landscape"
        />
      )}
      {!playing && (
        <>
          <BigButton onClick={playVideo}>
            <MdPlayArrow />
          </BigButton>
        </>
      )}
      {playing && (
        <YoutubeVideoControls
          muted={muted}
          onPause={pauseVideo}
          onPlay={playVideo}
          onToggleMute={toggleMute}
          onReplay={replayVideo}
        />
      )}
    </div>
  )
}
