import React from 'react'
import css from './hero.module.scss'
import Logo from 'assets/images/hero/hero-logo-mobile.svg'
import Rays from './images/Rays'
import { useTranslations } from 'next-intl'
import { CallToAction } from './call-to-action'
import AddToCalendar from '../add-to-calendar'
import PolygonAnim from 'components/domain/index/hero/polygon-anim'
import Mountains from 'assets/images/mtn-all-layers.svg'
import BackgroundBogota from './images/bogota-background.png'
import BackgroundPassport from './images/passport-background.png'
import BackgroundLive from './images/live-background.png'
import BackgroundDevconWeek from './images/devcon-week-background.png'
import { Button } from 'components/common/button'
import { Link } from 'components/common/link'
import TitleBogota from './images/bogota-title.svg'
import TitleDevcon from './images/devcon-title.svg'
import LogoBogota from 'assets/images/pages/bogota.svg'
import LogoVideo from 'assets/images/pages/archive-1.svg'
import LogoGetInvolved from 'assets/images/pages/get-involved.svg'
import LogoPassport from 'assets/images/pages/devcon-passport.svg'
import Image from 'next/image'

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

const usePages = () => {
  const intl = useTranslations()

  return [
    {
      id: 'passport',
      background: BackgroundPassport,
      titlePrefix: TitleDevcon,
      title: 'Passport',
      logo: LogoPassport,
      imageAlt: 'LogoBogota',
      button: {
        text: 'Launch Devcon App',
        url: 'https://app.devcon.org',
      },
    },
    {
      id: 'bogota',
      background: BackgroundBogota,
      backgroundAlt: 'Deva',
      titlePrefix: TitleBogota,
      title: 'City Guide',
      logo: LogoBogota,
      imageAlt: 'LogoBogota',
      button: {
        text: 'Discover Bogota',
        url: '/bogota',
      },
    },
    {
      id: 'devcon-week',
      background: BackgroundDevconWeek,
      titlePrefix: TitleDevcon,
      title: 'Week',
      logo: LogoGetInvolved,
      imageAlt: 'LogoBogota',
      button: {
        text: 'Devcon Week',
        url: '/devcon-week',
      },
    },
    {
      id: 'livestream',
      background: BackgroundLive,
      titlePrefix: TitleDevcon,
      title: 'Live',
      logo: LogoVideo,
      imageAlt: 'LogoBogota',
      button: {
        text: 'Stream Now',
        url: 'https://live.devcon.org',
      },
    },
  ]
}

export const Hero = () => {
  const intl = useTranslations()
  const heroEl = React.useRef(null)
  const pages = usePages()
  const [currentPage, setCurrentPage] = React.useState(0)
  const [focusNextPage, setFocusNextPage] = React.useState(false)
  const page = pages[currentPage]

  // const parallaxMultiplier = useParallax(heroEl)
  // const isScrolled = parallaxMultiplier > 0.15

  // React.useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     setCurrentPage(currentPage === pages.length - 1 ? 0 : currentPage + 1)
  //     setFocusNextPage(true)
  //   }, 1000 * 12)

  //   return () => clearTimeout(timeout)
  // }, [pages, currentPage, setCurrentPage])

  const rotateNextPage = () => {
    setCurrentPage(currentPage === pages.length - 1 ? 0 : currentPage + 1)
    //
    setFocusNextPage(true)
  }

  React.useEffect(() => {
    if (focusNextPage) {
      const el = document.getElementById(page.id)

      // Only scroll into view if not scrolled vertically, because otherwise we scroll the user back up to the top :D
      if (window.scrollY === 0 && el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }

      setFocusNextPage(false)
    }
  }, [page, focusNextPage])

  return (
    <>
      <div ref={heroEl} data-jest="hero" className={`${css['hero']} ${css[page.id]}`}>
        <div className={css['rays-container']}>
          <Rays className={css['rays']} />
        </div>

        {/* <PolygonAnim /> */}

        {/* <div className={css['parallax-container']}>
          <div className={css['mountain-container']}>
            <Mountains />
          </div>
        </div>

        <div className={css['parallax-container-2']}>
          <div className={css['clouds']} style={parallax(parallaxMultiplier, 2, 2) as any}></div>
        </div> */}

        <div className={css['page-background']}>
          <Image
            className={page.id === 'passport' ? css['active'] : ''}
            src={pages[0].background}
            layout="raw"
            priority
            alt={pages[0].backgroundAlt}
          />
          <Image
            className={page.id === 'bogota' ? css['active'] : ''}
            src={pages[1].background}
            layout="raw"
            priority
            alt={pages[1].backgroundAlt}
          />
          <Image
            className={page.id === 'devcon-week' ? css['active'] : ''}
            src={pages[2].background}
            layout="raw"
            priority
            alt={pages[2].backgroundAlt}
          />
          <Image
            className={page.id === 'livestream' ? css['active'] : ''}
            src={pages[3].background}
            layout="raw"
            priority
            alt={pages[3].backgroundAlt}
          />
        </div>

        <div className={css['left-rotated']}>
          <p className={'text-uppercase'}>{intl('global_subtitle')}</p>
        </div>
        <div className={css['right-rotated']}>
          <p className={'text-uppercase'}>{intl('journey')}</p>
        </div>

        <div className={`${css['page-container']} section`}>
          <div className={css['page']}>
            <div
              className={css['date']}
              onClick={() => {
                setCurrentPage(currentPage === pages.length - 1 ? 0 : currentPage + 1)
              }}
            >
              <p>Oct 2021</p>
              <p>11 → 14</p>
            </div>

            <div className={css['content']}>
              <page.logo className={css['logo']} />
              <div>
                <page.titlePrefix className={css['title-prefix']} />
                <p className={css['title']}>{page.title} —</p>
              </div>
              <Button className="red bold lg">
                <Link to={page.button.url}>{page.button.text} →</Link>
              </Button>
            </div>

            <div className={css['cta']}>
              <CallToAction
                items={
                  <>
                    <div
                      onClick={() => setCurrentPage(0)}
                      id="passport"
                      className={`${page.id === 'passport' && css['active']} ${css['cta-item']}`}
                    >
                      <p className="bold">Devcon Passport App —</p>
                      <p className="font-sm">Customize your Devcon experience</p>
                      <div className={css['timer']} onAnimationEnd={rotateNextPage}></div>
                    </div>
                    <div
                      onClick={() => setCurrentPage(1)}
                      id="bogota"
                      className={`${page.id === 'bogota' && css['active']} ${css['cta-item']}`}
                    >
                      <p className="bold">Bogota City Guide —</p>
                      <p className="font-sm">Discover the wonders of Bogotá</p>
                      <div className={css['timer']} onAnimationEnd={rotateNextPage}></div>
                    </div>
                    <div
                      onClick={() => setCurrentPage(2)}
                      id="devcon-week"
                      className={`${page.id === 'devcon-week' && css['active']} ${css['cta-item']}`}
                    >
                      <p className="bold">Devcon Week —</p>
                      <p className="font-sm">Participate in all devcon week</p>
                      <div className={css['timer']} onAnimationEnd={rotateNextPage}></div>
                    </div>
                    <div
                      onClick={() => setCurrentPage(3)}
                      id="livestream"
                      className={`${page.id === 'livestream' && css['active']} ${css['cta-item']}`}
                    >
                      <p className="bold">Devcon Live —</p>
                      <p className="font-sm">Stream Devcon</p>
                      <div className={css['timer']} onAnimationEnd={rotateNextPage}></div>
                    </div>
                  </>
                }
              />
            </div>
          </div>
        </div>

        {/* <div className={css['logo-container']}>
          <Logo alt={intl('global_title')} className={css['logo']} />
          <div className={css['add-to-cal']}>
            <div>
              <AddToCalendar />
            </div>
          </div>
        </div> */}

        {/* <div className={`${isScrolled ? css['hide'] : ''} ${css['scroll-for-more']}`}>
          <p>Scroll to learn more</p>
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 16 16" width="16" height="16">
            <g className="nc-icon-wrapper" fill="#ffffff">
              <g className={`${css['nc-loop-mouse-16-icon-f']}`}>
                <path
                  d="M10,0H6A4.012,4.012,0,0,0,2,4v8a4.012,4.012,0,0,0,4,4h4a4.012,4.012,0,0,0,4-4V4A4.012,4.012,0,0,0,10,0Zm2,12a2.006,2.006,0,0,1-2,2H6a2.006,2.006,0,0,1-2-2V4A2.006,2.006,0,0,1,6,2h4a2.006,2.006,0,0,1,2,2Z"
                  fill="#ffffff"
                ></path>
                <path
                  d="M8,4A.945.945,0,0,0,7,5V7A.945.945,0,0,0,8,8,.945.945,0,0,0,9,7V5A.945.945,0,0,0,8,4Z"
                  fill="#ffffff"
                  data-color="color-2"
                ></path>
              </g>
            </g>
          </svg>
        </div> */}
      </div>
      <div className="section" style={{ position: 'relative' }}>
        <div className={`expand ${css['gradient']}`}></div>
        {/* <div className={`border-bottom clear-bottom ${css['mobile']}`}>
          <CallToAction mobile />
        </div> */}
      </div>
    </>
  )
}
