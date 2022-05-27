import React, { useEffect, useLayoutEffect } from 'react'
import css from './hero.module.scss'
import Logo from 'assets/images/devcon-logo.svg'
import Rays from './svgs/Rays'
import IconEventNote from 'assets/icons/event_note.svg'
import { useTranslations } from 'next-intl'
import { TITLE } from 'utils/constants'
import { Link } from 'components/common/link'
import { CallToAction } from './call-to-action'
import Image from 'next/image'
import imageClouds from 'assets/images/clouds.png'
import imageMountains from 'assets/images/mountains.png'
import HorizontalLooper from 'components/common/horizontal-looper'
import { Button } from 'components/common/button'

const useParallax = (elementRef: any) => {
  const [parallaxMultiplier, setParallaxMultiplier] = React.useState(0)

  React.useEffect(() => {
    const element = elementRef.current

    if (!element) return

    let options = {
      threshold: new Array(101).fill(0).map((v, i) => i * 0.01),
    }

    const callback = (entries: any) => {
      const { intersectionRatio, boundingClientRect } = entries[0]

      const scrolledBeyond = boundingClientRect.y < 0

      const maxMagnitude = 200

      if (scrolledBeyond) {
        const magnitude = 100 + (100 - intersectionRatio * 100)

        setParallaxMultiplier(magnitude / maxMagnitude)
      } else {
        const magnitude = intersectionRatio * 100

        setParallaxMultiplier(magnitude / maxMagnitude)
      }
    }

    const observer = new IntersectionObserver(callback, options)

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [elementRef])

  return parallaxMultiplier
}

const parallax = (parallaxMultiplier: any) => {
  const baselineTranslateY = 0 // Upper limit translate Y
  const targetTransLateY = -30 // Lower limit translate Y
  const range = baselineTranslateY - targetTransLateY
  const translateYPercentage = baselineTranslateY - parallaxMultiplier * range

  return {
    transform: `translateY(${Math.min(translateYPercentage * -1)}%)`,
  }
}

// TO-DO: requestAnimationFrame (+ debounce?)
export const Hero = () => {
  const intl = useTranslations()
  const heroEl = React.useRef(null)
  const parallaxMultiplier = useParallax(heroEl)

  return (
    <>
      <div ref={heroEl} data-jest="hero" className={`${css['hero']}`}>
        <div className={css['rays-container']}>
          <Rays className={css['rays']} />
        </div>

        <div className={css['mountain-container']} style={parallax(parallaxMultiplier) as any}>
          <Image alt="Devcon mountains" src={imageMountains} />
        </div>

        <div className={css['cloud-container']} /*style={parallax(parallaxMultiplier) as any}*/>
          {/* <HorizontalLooper> */}
          <Image
            alt="Devcon clouds"
            /*className={css['clouds']}*/ src={imageClouds}
            objectFit="contain"
            objectPosition="bottom"
          />
          {/* </HorizontalLooper> */}
        </div>

        <div className={css['left-rotated']}>
          <p className={'text-uppercase'}>{intl('subtitle')}</p>
        </div>
        <div className={css['right-rotated']}>
          <p className={'text-uppercase'}>{intl('journey')}</p>
        </div>

        <div className={css['logo-container']}>
          <Logo alt={TITLE} className={css['logo']} />
        </div>

        {/* <div className="section">
          <div className={css['date-calendar']}>
            <Link to="https://devcon.org/devcon.ics" className={css['calendar']}>
              <p>{intl('description')}</p>
              <Button className="lg black ghost thin-borders">
                <IconEventNote className={`icon ${css['icon']}`} />
                <p>{intl('addtocalendar')}</p>
              </Button>
              <Button className="lg black ghost thin-borders">
                <IconEventNote className={`icon ${css['icon']}`} />
                <p>{intl('tickets')}</p>
              </Button>
            </Link>
          </div>
        </div> */}
      </div>
      <div className="section">
        <div className="border-bottom clear-bottom">
          <CallToAction mobile />
        </div>
      </div>
    </>
  )
}
