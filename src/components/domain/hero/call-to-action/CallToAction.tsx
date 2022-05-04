import React from 'react'
import { Link } from 'components/common/link'
import Slider from 'react-slick'
import css from './cta.module.scss'
import CtaSrc from 'assets/images/cta.svg'

type CTAProps = {
  mobile?: boolean
}

export const CallToAction = (props: CTAProps) => {
  const sliderRef = React.useRef<Slider>()

  let className = `${css['positional-wrapper']}`

  if (props.mobile) className += ` ${css['mobile']}`

  const callsToAction = [
    <Link key="1" to="https://google.com" allowDrag className={`no-select ${css['item']}`}>
      <p className="bold">Tickets —</p>
      <p className="font-sm">Get yo tickets now fool!</p>
    </Link>,
    <div key="2" className={`no-select ${css['item']}`}>
      <p className="bold">DIPs —</p>
      <p className="font-sm">Help improve Devcon</p>
    </div>,
    <div key="3" className={`no-select ${css['item']}`}>
      <p className="bold">Archive —</p>
      <p className="font-sm">Check out the Devcon archive!</p>
    </div>,
    <div key="4" className={`no-select ${css['item']}`}>
      <p className="bold">City Guide —</p>
      <p className="font-sm">Find your way around Bogota</p>
    </div>,
  ]

  const settings = {
    infinite: false,
    slidesToShow: Math.min(callsToAction.length, 4),
    slidesToScroll: 4,
    arrows: false,
    mobileFirst: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(callsToAction.length, 3),
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: Math.min(callsToAction.length, 2),
          slidesToScroll: 2,
        },
      },
    ],
  }

  return (
    <div className={className}>
      <div className={css['content']}>
        <div className={css['icon']}>
          <CtaSrc />
        </div>

        <div className={css['slider']}>
          <Slider
            ref={el => {
              if (el) sliderRef.current = el
            }}
            {...settings}
          >
            {callsToAction}
          </Slider>
        </div>
      </div>
    </div>
  )
}
