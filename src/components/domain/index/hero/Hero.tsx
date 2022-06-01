import React from 'react'
import css from './hero.module.scss'
import Logo from 'assets/images/devcon-logo.svg'
import Rays from './svgs/Rays'
import { useTranslations } from 'next-intl'
import { TITLE } from 'utils/constants'
import { CallToAction } from './call-to-action'
import Image from 'next/image'
import imageClouds from './svgs/clouds.png'
import imageMountains from 'assets/images/mountains.png'
import MountainsLayer1 from 'assets/images//mtn-1.svg'
import MountainsLayer2 from 'assets/images//mtn-2.svg'
import MountainsLayer3 from 'assets/images//mtn-3.svg'
import MountainsLayer4 from 'assets/images//mtn-4.svg'

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

      setParallaxMultiplier(intersectionRatio)
    }

    const observer = new IntersectionObserver(callback, options)

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [elementRef])

  return parallaxMultiplier
}

const parallax = (parallaxMultiplier: any, initial = 15, range = 15, min = 10000) => {
  const translateY = initial - parallaxMultiplier * range

  return {
    transform: `translateY(${Math.min(min, translateY)}%)`,
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

        <div className={css['parallax-container']}>
          <div className={css['mountain-container']} style={parallax(parallaxMultiplier) as any}>
            <MountainsLayer1 />
            {/* <Image alt="Devcon mountains" src={mountainsLayer4} objectFit="contain" /> */}
          </div>
          <div className={css['mountain-container']} style={parallax(parallaxMultiplier) as any}>
            <MountainsLayer2 />
            {/* <Image alt="Devcon mountains" src={mountainsLayer3} objectFit="contain" /> */}
          </div>
          <div className={css['mountain-container']} style={parallax(parallaxMultiplier, 20, 20) as any}>
            <MountainsLayer3 />
            {/* <Image alt="Devcon mountains" src={mountainsLayer1} objectFit="contain" /> */}
          </div>
          <div className={css['mountain-container']} style={parallax(parallaxMultiplier) as any}>
            <MountainsLayer4 />
            {/* <Image alt="Devcon mountains" src={mountainsLayer2} objectFit="contain" /> */}
          </div>
        </div>

        <div className={css['parallax-container-2']}>
          <div className={css['clouds']} style={parallax(parallaxMultiplier, 7.5, 7.5, 5) as any}></div>
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
      <div className="section" style={{ position: 'relative' }}>
        <div className={`expand ${css['gradient']}`}></div>
        <div className={`border-bottom clear-bottom`}>
          <CallToAction mobile />
        </div>
      </div>
    </>
  )
}
