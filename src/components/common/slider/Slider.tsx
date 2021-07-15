import React from 'react'
import SlickSlider from 'react-slick'
import css from './slider.module.scss'
import ChevronLeft from 'src/assets/icons/chevron_left.svg'
import ChevronRight from 'src/assets/icons/chevron_right.svg'

export const useSlider = (settings: any) => {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [cardsPerSlide, setCardsPerSlide] = React.useState(0)
  const sliderRef = React.useRef<SlickSlider>()

  const nCards = (() => {
    var counter = 0

    if (sliderRef.current) {
      React.Children.forEach(sliderRef.current.props.children, function (child) {
        if (child) counter++
      })
    }

    return counter
  })()

  const canNext = currentIndex < nCards - cardsPerSlide
  const canBack = currentIndex > 0

  return [
    {
      ...settings,
      beforeChange: (_: any, next: number) => {
        if (setCurrentIndex) setCurrentIndex(next)
      },
      onReInit: () => {
        if (!sliderRef.current) return
        if (!settings.responsive) return

        const { state } = sliderRef.current as any

        const currentBreakpoint = state.breakpoint
        const breakpoints = settings.responsive

        const activeBreakpoint =
          breakpoints?.find(({ breakpoint }: any) => {
            return breakpoint === currentBreakpoint
          })?.settings || settings

        const nextCardsPerSlide = activeBreakpoint?.slidesToShow

        if (cardsPerSlide !== nextCardsPerSlide) setCardsPerSlide(nextCardsPerSlide)
      },
    },
    {
      currentIndex,
      cardsPerSlide,
      nCards,
      canNext,
      canBack,
      canSlide: canNext || canBack,
      setCurrentIndex,
      setCardsPerSlide,
      sliderRef,
    },
  ]
}

const Arrows = (props: any) => {
  let className = `squared sm white inverted ${css['arrow-button']}`

  const canNext = props.currentIndex < props.nCards - props.cardsPerSlide
  const canBack = props.currentIndex > 0

  if (!canNext && !canBack) return null

  return (
    <div className={css['arrows']}>
      <button
        disabled={!canBack}
        className={className}
        aria-label="Slide left"
        onClick={() => props.sliderRef.current?.slickPrev()}
      >
        <ChevronLeft />
      </button>

      <button
        disabled={!canNext}
        className={className}
        aria-label="Slide right"
        onClick={() => props.sliderRef.current?.slickNext()}
      >
        <ChevronRight />
      </button>
    </div>
  )
}

type SliderProps = {
  sliderProps: any
  className?: string
  children?: React.ReactNode
  custom?: () => React.ReactNode
  title: string
}

export const Slider = (props: SliderProps) => {
  const [settings, sliderState] = props.sliderProps

  return (
    <div className={css['container']}>
      <div className={css['top-section']}>
        <h2 className="title">{props.title}</h2>

        <div className={css['controls']}>
          {props.custom && props.custom()}
          <Arrows {...sliderState} />
        </div>
      </div>

      <div className={`${props.className} ${css['children']}`}>
        <SlickSlider ref={sliderState.sliderRef} {...settings}>
          {props.children}
        </SlickSlider>
      </div>
    </div>
  )
}
