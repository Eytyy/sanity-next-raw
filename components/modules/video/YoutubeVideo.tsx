import getYouTubeId from 'get-youtube-id'
import React, { useCallback } from 'react'
import { MdPlayArrow } from 'react-icons/md'
import YouTube, { type YouTubePlayer, type YouTubeProps } from 'react-youtube'

import { YoutubeModuleProps } from '../types'
import BigButton from './BigButton'
import VideoPoster from './Poster'
import YoutubeVideoControls from './YoutubeControls'

export default function YoutubeVideo({
  src,
  cover,
  loop,
  autoplay,
}: YoutubeModuleProps) {
  const [player, setPlayer] = React.useState<YouTubePlayer | null>(null)
  const [playing, setPlaying] = React.useState(false)
  const [muted, setMuted] = React.useState(false)
  const id = getYouTubeId(src)

  const opts: YouTubeProps['opts'] = {
    height: '390',
    width: '640',
    playerVars: {
      loop: loop ? 1 : 0,
      autoplay: autoplay ? 1 : 0,
      enablejsapi: 1,
      playsinline: 1,
      controls: 0,
    },
  }
  const playVideo = useCallback(() => {
    if (player) {
      player.playVideo()
      setPlaying(true)
    }
  }, [player])

  const toggleMute = useCallback(() => {
    if (player) {
      if (player.isMuted()) {
        player.unMute()
        setMuted(false)
      } else {
        player.mute()
        setMuted(true)
      }
    }
  }, [player])

  const replayVideo = useCallback(() => {
    if (player) {
      player.seekTo(0)
      player.playVideo()
      setPlaying(true)
    }
  }, [player])

  const pauseVideo = useCallback(() => {
    if (player) {
      player.pauseVideo()
      setPlaying(false)
    }
  }, [player])

  return (
    <div className="relative">
      <YouTube
        videoId={id}
        iframeClassName="aspect-video w-full h-auto"
        opts={opts}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onReady={(e) => {
          setPlayer(e.target)
        }}
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
