import React from 'react'
import css from './hero.module.scss'
// import Logo from './svgs/Logo'
import logo from 'src/assets/images/devcon-logo.svg'
import Clouds from './svgs/Clouds'
import Rays from './svgs/Rays'
import Mountains from './svgs/Mountains'
import IconEventNote from 'src/assets/icons/event_note.svg'
import { useIntl } from 'gatsby-plugin-intl'
import { TITLE } from 'src/utils/constants'

const parallax = (intersectionRatio: any) => {
  return {
    '--translateY': `${(100 - intersectionRatio) / 5}%`,
    // transform: `translateY(${(100 - intersectionRatio) / 5}%)`,
  }
}

// Might want to benchmark SVG performance (should be less CPU intensive to go with pngs, at the cost of not being able to animate)
// TO-DO: requestAnimationFrame (+ debounce?)
export const Hero = () => {
  const intl = useIntl()
  const heroEl = React.useRef(null)
  const [intersectionRatio, setIntersectionRatio] = React.useState(0)

  React.useLayoutEffect(() => {
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
    <div ref={heroEl} className={`${css['hero']}`}>
      <Rays className={css['rays']} />

      <div className={css['mountain-container']}>
        <Mountains style={parallax(intersectionRatio)} className={css['mountains']} />
      </div>

      <div className={css['cloud-container']}>
        <Clouds style={parallax(intersectionRatio)} className={css['clouds']} />
      </div>

      <div className={css['left-rotated']}>
        <p className={css['uppercase']}>{intl.formatMessage({ id: 'subtitle' })}</p>
      </div>
      <div className={css['right-rotated']}>
        <p className={css['uppercase']}>{intl.formatMessage({ id: 'journey' })}</p>
      </div>

      <div className={css['grid']}>
        <img alt={TITLE} className={css['logo']} src={logo} /> {/*<Logo className={css['logo']} />*/}
        <div className={css['info']}>
          <div className={css['date']}>
            <p className="h2">
              Aug 2021
              <br />
              10 → 13
            </p>
          </div>

          <div className={css['calendar']}>
            <p>{intl.formatMessage({ id: 'description' })}</p>
            <button>
              <IconEventNote className={`icon ${css['icon']}`} />
              <p>{intl.formatMessage({ id: 'addtocalendar' })}</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Animation resource: https://whoisryosuke.com/blog/2020/handling-scroll-based-animations-in-react/
