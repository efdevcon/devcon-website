import React from 'react'
import css from './hero.module.scss'
import Logo from 'assets/images/hero/hero-logo-mobile.svg'
import Rays from './images/Rays'
import { useTranslations } from 'next-intl'
import { CallToAction } from './call-to-action'
import Mountains from 'assets/images/mtn-all-layers.svg'

const useParallax = (elementRef: any) => {
  const [parallaxMultiplier, setParallaxMultiplier] = React.useState(0)

  React.useEffect(() => {
    const element = elementRef.current

    if (!element) return

    let options = {
      threshold: new Array(101).fill(0).map((v, i) => i * 0.01),
    }

    const callback = (entries: any) => {
      const { intersectionRatio } = entries[0]

      setParallaxMultiplier(1 - intersectionRatio)
    }

    const observer = new IntersectionObserver(callback, options)

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [elementRef])

  return parallaxMultiplier
}

const parallax = (parallaxMultiplier: any, initial = -15, range = 15) => {
  const translateY = initial - parallaxMultiplier * range

  return {
    transform: `translateY(${translateY}%)`,
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
          <div className={css['mountain-container']}>
            <Mountains />
          </div>
        </div>

        <div className={css['parallax-container-2']}>
          <div className={css['clouds']} style={parallax(parallaxMultiplier, 4, 4) as any}></div>
        </div>

        <div className={css['left-rotated']}>
          <p className={'text-uppercase'}>{intl('global_subtitle')}</p>
        </div>
        <div className={css['right-rotated']}>
          <p className={'text-uppercase'}>{intl('journey')}</p>
        </div>

        <div className={css['logo-container']}>
          <Logo alt={intl('global_title')} className={css['logo']} />
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
