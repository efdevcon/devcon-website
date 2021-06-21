import React from 'react'
import Slider from 'react-slick'
import { useEfTalks } from 'src/hooks/useEfTalks'
import { useLatest } from 'src/hooks/useLatest'
import { useMostPopular } from 'src/hooks/useMostPopular'
import css from './playlists.module.scss'
import { Video } from './Video'

export const Playlists = () => {
  const mostPopular = useMostPopular()
  const latest = useLatest()
  const efTalks = useEfTalks()

  function getSliderSettings(nItems: number) {
    return {
      infinite: false,
      speed: 500,
      slidesToShow: Math.min(nItems, 4.1),
      arrows: false,
      slidesToScroll: Math.min(nItems, 4),
      touchThreshold: 100,
      mobileFirst: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: Math.min(nItems, 3.1),
            slidesToScroll: Math.min(nItems, 3),
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
  }

  return (
    <div className={css['playlists']}>
      <h2 className="spaced title">Most Popular</h2>
      <div className={css['slider']}>
        <Slider {...getSliderSettings(mostPopular.videoCount)}>
          {mostPopular.videos.map((item: any, i: number) => {
            const first = i === 0
            const className = first ? css['first'] : ''

            return <Video slide key={i} className={className} video={item} />
          })}
        </Slider>
      </div>

      <h2 className="spaced title">Devcon 5</h2>
      <div className={css['slider']}>
        <Slider {...getSliderSettings(latest.videoCount)}>
          {latest.videos.map((item: any, i: number) => {
            const first = i === 0
            const className = first ? css['first'] : ''

            return <Video slide key={i} className={className} video={item} />
          })}
        </Slider>
      </div>

      <h2 className="spaced title">EF Talks</h2>
      <div className={css['slider']}>
        <Slider {...getSliderSettings(efTalks.videoCount)}>
          {efTalks.videos.map((item: any, i: number) => {
            const first = i === 0
            const className = first ? css['first'] : ''

            return <Video slide key={i} className={className} video={item} />
          })}
        </Slider>
      </div>
    </div>
  )
}
