import React from 'react'
import Slider from 'react-slick'
import { StaticImage } from 'gatsby-plugin-image'
import { VideoCard } from '../playlists'
import css from './staff-picks.module.scss'
import { useStaffPicks } from 'src/hooks/useStaffPicks'

export const StaffPicks = (props: any) => {
  const staffPicks = useStaffPicks()

  const sliderSettings = {
    infinite: false,
    touchThreshold: 100,
    slidesToShow: 2.6,
    arrows: false,
    swipeToSlide: true,
    slidesToScroll: 1,
    mobileFirst: true,
    responsive: [
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
    <>
      <div className="section">
        <div className="content">
          <h2 className="spaced title">Staff Picks</h2>
        </div>
      </div>

      <div className={css['slider']}>
        <Slider {...sliderSettings}>
          {staffPicks.videos.map(i => {
            return <VideoCard key={i.id} slide video={i} />
          })}
        </Slider>
      </div>
    </>
  )
}
