import useEmblaCarousel from 'embla-carousel-react'
import React from 'react'
import {
  MdArrowLeft,
  MdArrowRight,
  MdNavigateBefore,
  MdNavigateNext,
  MdOutlineArrowBack,
  MdOutlineArrowForward,
} from 'react-icons/md'

import Module from '..'
import { MediaModuleProps } from '../types'

type Props = {
  items: MediaModuleProps['items']
}

export default function MediaSlider({ items }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel()

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <div className="embla overflow-hidden relative group" ref={emblaRef}>
      <div className="embla__container flex">
        {items.map((item) => (
          <div
            key={item._key}
            className="embla__slide flex-[0_0_100%] min-w-0 flex flex-col items-center justify-center"
          >
            <div className="w-full">
              <Module module={item} />
            </div>
          </div>
        ))}
      </div>
      <button
        className="embla__prev absolute top-1/2 left-4 bg-white rounded-full group-hover:opacity-100 opacity-0 transition-opacity duration-300"
        onClick={scrollPrev}
      >
        <MdNavigateBefore size={42} />
      </button>
      <button
        className="embla__next absolute top-1/2 right-4 bg-white rounded-full group-hover:opacity-100 opacity-0 transition-opacity duration-300"
        onClick={scrollNext}
      >
        <MdNavigateNext size={42} />
      </button>
    </div>
  )
}
