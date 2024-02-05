import { useInView } from 'framer-motion'
import React from 'react'

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
      return {
        ...state,
        muted:
          typeof action.payload !== undefined ? action.payload : !state.muted,
      }
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

export default function useVideo(autoplay: boolean) {
  const [state, dispatch] = React.useReducer(
    reducer,
    { autoplay },
    initializeState,
  )

  return {
    state,
    dispatch,
  }
}
