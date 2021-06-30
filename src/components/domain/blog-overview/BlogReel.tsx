import React, { useRef, useState } from 'react'
import Slider from 'react-slick'
import { useBlogs } from 'src/hooks/useBlogs'
import moment from 'moment'
import css from './blog-reel.module.scss'
import { Card } from '../../common/card'
import { BlogPost } from 'src/types/BlogPost'
import ArrowLeft from 'src/assets/icons/arrow_left.svg'
import ArrowRight from 'src/assets/icons/arrow_right.svg'

export const useBlogState = () => {
  const blogs = useBlogs()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [cardsPerSlide, setCardsPerSlide] = React.useState(3)
  const sliderRef = useRef<Slider>()

  return {
    blogs,
    currentIndex,
    setCurrentIndex,
    setCardsPerSlide,
    sliderRef,
    canNext: currentIndex < blogs.length - cardsPerSlide,
    canBack: currentIndex > 0,
  }
}

export const Arrows = (props: any) => {
  let className = `squared sm white inverted ${css['arrow-button']}`

  if (props.noSwipe) {
    className += ` ${css['always-buttons']}`
  }

  return (
    <div className={css['arrows']}>
      <button
        disabled={!props.canBack}
        className={className}
        aria-label="Slide left"
        onClick={() => props.sliderRef.current?.slickPrev()}
      >
        <ArrowLeft />
      </button>

      <button
        disabled={!props.canNext}
        className={className}
        aria-label="Slide right"
        onClick={() => props.sliderRef.current?.slickNext()}
      >
        <ArrowRight />
      </button>
    </div>
  )
}

export const Cards = React.forwardRef((props: any, ref: any) => {
  const sliderRef = useRef<Slider>()

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 3.1,
    swipe: !props.noSwipe,
    arrows: false,
    slidesToScroll: 3,
    touchThreshold: 100,
    mobileFirst: true,
    beforeChange: (_: any, next: number) => {
      if (props.setCurrentIndex) props.setCurrentIndex(Math.round(next))
    },
    onReInit: () => {
      if (!sliderRef.current) return

      const { state, props: sliderSettings } = sliderRef.current

      const currentBreakpoint = state.breakpoint
      const breakpoints = sliderSettings.responsive

      const activeBreakpoint = breakpoints?.find(({ breakpoint }) => {
        return breakpoint === currentBreakpoint
      })

      const nextCardsPerSlide = activeBreakpoint?.settings?.slidesToScroll || 3

      if (props.cardsPerSlide !== nextCardsPerSlide) props.setCardsPerSlide(nextCardsPerSlide)
    },
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2.1,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1.1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  return (
    <div className={css['cards']}>
      <Slider
        ref={el => {
          sliderRef.current = el
          if (ref) ref.current = el
        }}
        {...settings}
      >
        {props.blogs.map((blog: BlogPost, i: number) => {
          let className = css['card']

          if (props.customCardClass) className += ` ${props.customCardClass}`
          if (i === props.blogs.length - 1) className += ` ${css['last']}`
          if (props.noSwipe) className += ` ${css['no-swipe']}`

          return (
            <Card
              className={className}
              key={blog.slug}
              title={blog.title}
              imageUrl={blog.imageUrl}
              expandLink
              linkUrl={blog.permaLink} // Linking to blog domain temporarily until blog page is done (static-phase)
              metadata={[moment(blog.date).format('ll'), blog.author]}
            />
          )
        })}
      </Slider>
    </div>
  )
})

export function BlogReel() {
  const blogState = useBlogState()

  return (
    <div className={css['blog-container']}>
      <div className={css['top-section']}>
        <h2 className="title spaced">Blog</h2>

        <Arrows {...blogState} />
      </div>

      <Cards {...blogState} ref={blogState.sliderRef} />
    </div>
  )
}
