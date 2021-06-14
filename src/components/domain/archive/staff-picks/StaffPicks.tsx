import React from 'react'
import Slider from 'react-slick'
import { StaticImage } from 'gatsby-plugin-image'
import { Video } from '../playlists'
import css from './staff-picks.module.scss'

export const StaffPicks = (props: any) => {
  const nItems = 2

  const sliderSettings = {
    infinite: false,
    touchThreshold: 100,
    slidesToShow: 2.6,
    arrows: false,
    swipeToSlide: true,
    // slidesToScroll: 1,
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

      <div className={css['slider']}>
        <Slider {...sliderSettings}>
          <Video big slide />
          <Video big slide />
          <Video big slide />
        </Slider>
      </div>

      {/* <Slider {...sliderSettings}>
        <div className={`${css['img']}`}>
          <div className="aspect">
            <div className={css['first']}>
              <StaticImage
                src={'../../../../assets/images/vitalik_3x.png'}
                alt="Fellow: Benson Njuguna"
                placeholder="blurred"
                layout="fullWidth"
              />
              <div className={css['info']}>
                <p className="font-lg">Title</p>
                <p>Description</p>
              </div>
            </div>
          </div>
        </div>
        <div className={`${css['img']}`}>
          <div className="aspect">
            <div>
              <StaticImage
                src={'../../../../assets/images/pwa_prompt.png'}
                alt="Fellow: Benson Njuguna"
                placeholder="blurred"
                layout="fullWidth"
              />
              <div className={css['info']}>
                <p className="font-lg">Title</p>
                <p>Description</p>
              </div>
            </div>
          </div>
        </div>
        <div className={`${css['img']}`}>
          <div className="aspect">
            <div>
              <StaticImage
                src={'../../../../assets/images/vitalik_3x.png'}
                alt="Fellow: Benson Njuguna"
                placeholder="blurred"
                layout="fullWidth"
              />
              <div className={css['info']}>
                <p className="font-lg">Title</p>
                <p>Description</p>
              </div>
            </div>
          </div>
        </div>
      </Slider> */}
    </>
  )
}
