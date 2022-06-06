import React from 'react'
import { Link } from 'components/common/link'
import Slider from 'react-slick'
import css from './cta.module.scss'
import CtaSrc from 'assets/images/cta.svg'
import SwipeToScroll from 'components/common/swipe-to-scroll'
import { useTranslations } from 'next-intl'

type CTAProps = {
  mobile?: boolean
}

export const CallToAction = (props: CTAProps) => {
  const sliderRef = React.useRef<Slider>()
  // const intl = useTranslations()

  let className = `${css['positional-wrapper']}`

  const callsToAction = (
    <div className={css['items']}>
      <Link key="1" to="/tickets" allowDrag className={`no-select ${css['item']}`}>
        <p className="bold">Discount Tickets —</p>
        <p className="font-sm">Applications open now</p>
      </Link>
      <Link to="/applications" key="3" allowDrag className={`no-select ${css['item']}`}>
        <p className="bold">Speaker Applications —</p>
        <p className="font-sm">Apply to contribute now</p>
      </Link>

      {/* <Link to="https://archive.devcon.org" key="3" className={`no-select ${css['item']}`}>
        <p className="bold">Archive —</p>
        <p className="font-sm">Check out the Devcon archive!</p>
      </Link> */}
      <Link to="/dips" key="2" allowDrag className={`no-select ${css['item']}`}>
        <p className="bold">DIPs —</p>
        <p className="font-sm">Help improve Devcon</p>
      </Link>
      <Link to="/bogota" key="4" allowDrag className={`no-select ${css['item']}`}>
        <p className="bold">City Guide —</p>
        <p className="font-sm">Find your way around Bogotá</p>
      </Link>
    </div>
  )

  return (
    <div className={className}>
      <div className={css['content']}>
        <div className={css['icon']}>
          <CtaSrc />
        </div>

        <div className={css['swipe-wrapper']}>
          <SwipeToScroll>{callsToAction}</SwipeToScroll>
        </div>
      </div>
    </div>
  )
}
