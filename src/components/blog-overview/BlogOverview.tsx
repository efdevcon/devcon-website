import React, { useRef, useState } from 'react'
import Slider from 'react-slick'
import { useBlogs } from 'src/hooks/useBlogs'
import moment from 'moment'
import css from './blog-overview.module.scss'
import { Card } from '../common/card'
import { BlogPost } from 'src/types/BlogPost'
import ArrowLeft from 'src/assets/icons/arrow_left.svg'
import ArrowRight from 'src/assets/icons/arrow_right.svg'

export const Cards = React.forwardRef((props: any, ref: any) => {
  const sliderRef = useRef<Slider>()

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 3.1,
    arrows: false,
    slidesToScroll: 3,
    touchThreshold: 100,
    mobileFirst: true,
    beforeChange: (_: any, next: number) => {
      if (props.setCurrentIndex) props.setCurrentIndex(Math.round(next))
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
        breakpoint: 410,
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

          return (
            <Card
              className={className}
              key={blog.slug}
              title={blog.title}
              imageUrl={blog.imageUrl}
              linkUrl={blog.slug}
              metadata={[moment(blog.date).format('ll'), blog.author]}
            />
          )
        })}
      </Slider>
    </div>
  )
})

export function BlogOverview() {
  const blogs = useBlogs()
  const [currentIndex, setCurrentIndex] = useState(0)
  const sliderRef = useRef<Slider>()

  return (
    <div className={css['blog-container']}>
      <div className={css['top-section']}>
        <h3 className="subsection-header">Blog</h3>

        <div className={css['arrows']}>
          <button
            className={css['arrow-button']}
            disabled={currentIndex === 0}
            onClick={() => sliderRef.current?.slickPrev()}
          >
            <ArrowLeft />
          </button>

          <button
            className={css['arrow-button']}
            disabled={currentIndex >= blogs.length - 3}
            onClick={() => sliderRef.current?.slickNext()}
          >
            <ArrowRight />
          </button>
        </div>
      </div>

      <Cards ref={sliderRef} blogs={blogs} setCurrentIndex={setCurrentIndex} />
    </div>
  )
}
