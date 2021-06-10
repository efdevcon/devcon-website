import React from 'react'
import Slider from 'react-slick'
import css from './playlists.module.scss'
import { StaticImage } from 'gatsby-plugin-image'
import { BasicCard } from 'src/components/common/card'

type PlaylistProps = {
  items: any[]
}

export const Video = (props: any) => {
  let className = css['card']

  if (props.className) className += ` ${props.className}`

  return (
    <BasicCard className={className}>
      <div className="aspect">
        <StaticImage
          src={'../../../../assets/images/pwa_prompt.png'}
          alt="Fellow: Benson Njuguna"
          placeholder="blurred"
          layout="fullWidth"
        />
      </div>
      <div className={css['body']}>
        <h4 className="font-sm bold">Session Name</h4>

        <p className="font-xs">Speakers</p>
        <p className="font-xs">Session Types</p>
      </div>
    </BasicCard>
  )
}

export const CuratedPlaylists = (props: PlaylistProps) => {
  const nItems = 4 // Make dynamic later

  const sliderSettings = {
    infinite: false,
    speed: 500,
    slidesToShow: Math.min(nItems, 4.1),
    arrows: false,
    touchThreshold: 100,
    slidesToScroll: 4,
    mobileFirst: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(nItems, 2.1),
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
    <div className={css['curated-playlists']}>
      <h2 className="spaced title">Curated Playlists</h2>
      <div className={css['slider']}>
        <Slider {...sliderSettings}>
          {props.items.map((item: any, i: number) => {
            const nTalks = 15
            const first = i === 0

            let className = `${css['card']} ${css['big']}`

            if (first) className += ` ${css['first']}`

            return (
              <BasicCard key={i} className={className}>
                <div className="aspect square">
                  <StaticImage
                    src={'../../../../assets/images/pwa_prompt.png'}
                    alt="Fellow: Benson Njuguna"
                    placeholder="blurred"
                    layout="fullWidth"
                  />
                </div>
                <div className={css['body']}>
                  <div className="label">{nTalks} talks</div>
                  <h4 className="title">Buidl Guild</h4>
                  <p className="bold font-xs">
                    <span className={css['opaque']}>BY</span> AUSTIN GRIFFITH, KEVIN OWOCKI
                  </p>
                </div>
              </BasicCard>
            )
          })}
        </Slider>
      </div>
    </div>
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

            return <Video key={i} className={className} />
          })}
        </Slider>
      </div>

      <h2 className="spaced title">Devcon 5</h2>
      <div className={css['slider']}>
        <Slider {...sliderSettings}>
          {props.items.map((item: any, i: number) => {
            const first = i === 0

            const className = first ? css['first'] : ''

            return <Video key={i} className={className} />
          })}
        </Slider>
      </div>

      <h2 className="spaced title">EF Talks</h2>
      <div className={css['slider']}>
        <Slider {...sliderSettings}>
          {props.items.map((item: any, i: number) => {
            const first = i === 0

            const className = first ? css['first'] : ''

            return <Video key={i} className={className} />
          })}
        </Slider>
      </div>
    </div>
  )
}
