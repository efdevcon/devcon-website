import React from 'react'
import Slider from 'react-slick'
import css from './playlists.module.scss'
import { StaticImage } from 'gatsby-plugin-image'
import { BasicCard } from 'src/components/common/card'

type PlaylistProps = {
  items: any[]
}

export const Video = (props: any) => {
  let className = css['video-card']

  if (props.className) className += ` ${props.className}`
  if (props.slide) className += ` ${css['slide']}`
  if (props.big) className += ` ${css['big']}`
  if (props.horizontal) className += ` ${css['horizontal']}`

  return (
    <BasicCard className={className}>
      {/* Need the wrapper so we can constrain the aspect div */}
      <div className={css['aspect-wrapper']}>
        <div className="aspect">
          <StaticImage
            src={'../../../../assets/images/vitalik_3x.png'}
            alt="Fellow: Benson Njuguna"
            placeholder="blurred"
            layout="fullWidth"
          />
        </div>
      </div>
      <div className={css['body']}>
        <h4 className={css['title']} /*className="font-sm bold"*/>Session Name</h4>

        <p className={css['description']} /*className="font-xs"*/>Speakers</p>
        <p className="font-xs">Session Types</p>
      </div>
    </BasicCard>
  )
}

export const Playlists = (props: PlaylistProps) => {
  const nItems = 5 // Make dynamic later

  const sliderSettings = {
    infinite: false,
    speed: 500,
    slidesToShow: Math.min(nItems, 5.1), // 4 = number of items
    arrows: false,
    slidesToScroll: 4,
    touchThreshold: 100,
    mobileFirst: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(nItems, 3.1),
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: Math.min(nItems, 1.1),
          slidesToScroll: 1,
        },
      },
    ],
  }

  return (
    <div className={css['playlists']}>
      <h2 className="spaced title">Most Popular</h2>
      <div className={css['slider']}>
        <Slider {...sliderSettings}>
          {props.items.map((item: any, i: number) => {
            const first = i === 0

            const className = first ? css['first'] : ''

            return <Video slide key={i} className={className} />
          })}
        </Slider>
      </div>

      <h2 className="spaced title">Devcon 5</h2>
      <div className={css['slider']}>
        <Slider {...sliderSettings}>
          {props.items.map((item: any, i: number) => {
            const first = i === 0

            const className = first ? css['first'] : ''

            return <Video slide key={i} className={className} />
          })}
        </Slider>
      </div>

      <h2 className="spaced title">EF Talks</h2>
      <div className={css['slider']}>
        <Slider {...sliderSettings}>
          {props.items.map((item: any, i: number) => {
            const first = i === 0

            const className = first ? css['first'] : ''

            return <Video slide key={i} className={className} />
          })}
        </Slider>
      </div>
    </div>
  )
}
