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
import { Button } from 'components/common/button'

const parallax = (intersectionRatio: any) => {
  return {
    '--translateY': `${(100 - intersectionRatio) / 5}%`,
  }
}

const isBrowser = typeof window !== 'undefined'
const useIsomorphicLayoutEffect = isBrowser ? useLayoutEffect : useEffect

// TO-DO: requestAnimationFrame (+ debounce?)
export const Hero = () => {
  const intl = useTranslations()
  const heroEl = React.useRef(null)
  const [intersectionRatio, setIntersectionRatio] = React.useState(0)

  useIsomorphicLayoutEffect(() => {
    let options = {
      threshold: new Array(101).fill(0).map((v, i) => i * 0.01),
    }

    const callback = (entries: any) => {
      const { intersectionRatio } = entries[0]

      setIntersectionRatio(Math.floor(intersectionRatio * 100))
    }

    const observer = new IntersectionObserver(callback, options)

    const element: any = heroEl.current

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [])

  return (
    <>
      <div ref={heroEl} data-jest="hero" className={`${css['hero']}`}>
        <Rays className={css['rays']} />

        <div className={css['mountain-container']} style={parallax(intersectionRatio) as any}>
          <Image alt="Devcon mountains" src={imageMountains} />
        </div>

        <div className={css['cloud-container']} style={parallax(intersectionRatio) as any}>
          <Image
            alt="Devcon clouds"
            /*className={css['clouds']}*/ src={imageClouds}
            objectFit="cover"
            objectPosition="bottom"
          />
        </div>

        <div className={css['left-rotated']}>
          <p className={css['text-uppercase']}>{intl('subtitle')}</p>
        </div>
        <div className={css['right-rotated']}>
          <p className={css['text-uppercase']}>{intl('journey')}</p>
        </div>

        <div className={css['logo-container']}>
          <Logo alt={TITLE} className={css['logo']} />
        </div>

        <div className={css['date']}>
          <p className="h2">
            Aug 2021
            <br />
            10 → 13
          </p>
        </div>

        {/* <CallToAction /> */}

        <Link to="https://devcon.org/devcon.ics" className={css['calendar']}>
          <p>{intl('description')}</p>
          <Button className="lg black">
            <IconEventNote className={`icon ${css['icon']}`} />
            <p>{intl('addtocalendar')}</p>
          </Button>
        </Link>
      </div>
      <CallToAction mobile />
    </>
  )
}
