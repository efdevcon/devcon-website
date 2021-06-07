import React from 'react'
import Slider from 'react-slick'
import { StaticImage } from 'gatsby-plugin-image'
import css from './staff-picks.module.scss'

export const StaffPicks = (props: any) => {
  const nItems = 2

  const sliderSettings = {
    infinite: false,
    speed: 500,
    slidesToShow: Math.min(nItems, 2.6),
    arrows: false,
    slidesToScroll: 2,
    // mobileFirst: true,
    // responsive: [
    //   {
    //     breakpoint: 600,
    //     settings: {
    //       slidesToShow: Math.min(nItems, 1.1),
    //       slidesToScroll: 1,
    //     },
    //   },
    // ],
  }

  return (
    <>
      <div className="section">
        <div className="content">
          <h2 className="spaced title">Staff Picks</h2>
        </div>
      </div>

      <Slider {...sliderSettings}>
        <div className={`${css['img']}`}>
          <div className="aspect">
            <StaticImage
              src={'../../../../assets/images/pwa_prompt.png'}
              alt="Fellow: Benson Njuguna"
              placeholder="blurred"
              layout="fullWidth"
            />
          </div>
        </div>
        <div className={`${css['img']}`}>
          <div className="aspect">
            <StaticImage
              src={'../../../../assets/images/pwa_prompt.png'}
              alt="Fellow: Benson Njuguna"
              placeholder="blurred"
              layout="fullWidth"
            />
          </div>
        </div>
        <div className={`${css['img']}`}>
          <div className="aspect">
            <StaticImage
              src={'../../../../assets/images/pwa_prompt.png'}
              alt="Fellow: Benson Njuguna"
              placeholder="blurred"
              layout="fullWidth"
            />
          </div>
        </div>
      </Slider>
    </>
  )
}
