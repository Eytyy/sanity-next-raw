import React from 'react'

type Props = {
  duration: number
  progress: number
  onSeek: (seekTime: number) => void
}

export default function VideoPorgressBar({
  duration,
  progress,
  onSeek,
}: Props) {
  const progressBarRef = React.useRef<HTMLDivElement>(null)
  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const seekTime =
      (e.nativeEvent.offsetX / progressBarRef.current.offsetWidth) * duration
    onSeek(seekTime)
  }
  const progressBarWidth = `${progress}%`
  return (
    <div
      className="progress-bar-container absolute bottom-0 left-0 w-full h-1 cursor-pointer z-30"
      onClick={seek}
      ref={progressBarRef}
    >
      <div
        className="progress-bar bg-[red] h-full transition-all duration-[0.2s] ease-in-out"
        style={{ width: progressBarWidth }}
      ></div>
    </div>
  )
}
