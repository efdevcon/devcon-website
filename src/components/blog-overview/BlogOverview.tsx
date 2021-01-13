import React, { useRef, useState } from 'react'
import Slider from 'react-slick'
import { useBlogs } from 'src/hooks/useBlogs'
import moment from 'moment'
import css from './blog-overview.module.scss'
import { Card } from '../common/card'
import { BlogPost } from 'src/types/BlogPost'
import ArrowLeft from 'src/assets/icons/arrow_left.svg'
import ArrowRight from 'src/assets/icons/arrow_right.svg'

export function BlogOverview() {
  const blogs = useBlogs()
  const [currentIndex, setCurrentIndex] = useState(0)
  const sliderRef = useRef<Slider>()

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 3.1,
    slidesToScroll: 3,
    mobileFirst: true,
    beforeChange: (_: any, next: number) => {
      setCurrentIndex(Math.round(next))
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

      <div className={css['cards']}>
        <Slider ref={sliderRef} {...settings}>
          {blogs.map((blog: BlogPost, i) => {
            let className = css['card']

            if (i === 0) className += ` ${css['first']}`
            if (i === blogs.length - 1) className += ` ${css['last']}`

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
    </div>
  )
}
