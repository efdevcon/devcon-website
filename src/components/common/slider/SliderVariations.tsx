import React from 'react'
import css from './slider-variations.module.scss'
import { Slider, useSlider } from 'components/common/slider'
import { BasicCard } from 'components/common/card'

type SliderStickyNotesProps = {
  cards: {
    title: string
    description: string
    color: 'pink' | 'yellow' | 'green' | 'blue'
  }[]
}

export const SliderStickyNotes = (props: SliderStickyNotesProps) => {
  const settings = {
    infinite: false,
    arrows: false,
    speed: 500,
    slidesToShow: 4,
    swipeToSlide: true,
    touchThreshold: 100,
    mobileFirst: true,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2.5,
        },
      },
      {
        breakpoint: 350,
        settings: {
          slidesToShow: 2.1,
        },
      },
    ],
  }

  const sliderProps = useSlider(settings)

  return (
    <Slider containerClassName={css['slider']} sliderProps={sliderProps} title={props.title} onlySlider>
      {props.cards.map(({ title, description, color }) => {
        return (
          <BasicCard
            key={title}
            className={`${css['card']} ${css[color]}`}
            slide={sliderProps[1].canSlide}
            expandLink
            linkUrl="/app/schedule"
            allowDrag
          >
            <>
              <p className={css['title']}>{title}</p>
              <p className={css['description']}>{description}</p>
            </>
          </BasicCard>
        )
      })}
    </Slider>
  )
}
