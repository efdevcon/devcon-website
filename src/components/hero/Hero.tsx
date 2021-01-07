import React from 'react'
import css from './hero.module.scss'
import Logo from './svgs/Logo'
import Clouds from './svgs/Clouds'
import Rays from './svgs/Rays'
import Mountains from './svgs/Mountains'
import IconEventNote from 'src/assets/icons/event_note.svg'

const parallax = (intersectionRatio: any) => {
  return {
    transform: `translateY(${(100 - intersectionRatio) / 4}%)`,
  }
}

// Might want to benchmark SVG performance (should be less CPU intensive to go with pngs, at the cost of not being able to animate)
// TO-DO: requestAnimationFrame (+ debounce?)
export const Hero = () => {
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
    <div ref={heroEl} className={css['hero']}>
      <Rays className={css['rays']} />
      {/* <div style={parallax(intersectionRatio)} className={css['bottom-section']}> */}
      <Mountains style={parallax(intersectionRatio)} className={css['mountains']} />

      <div className={css['cloud-container']}>
        <Clouds style={parallax(intersectionRatio)} className={css['clouds']} />
      </div>
      {/* </div> */}
      <div className={css['grid']}>
        <Logo className={css['logo']} />

        <div className={css['info']}>
          <div className={css['date']}>
            <p className="h2">
              Aug 2021
              <br />
              10 - 13
            </p>
          </div>

          <div className={css['calendar']}>
            <p>The annual conference for all Ethereum developers, researchers, thinkers, and makers.</p>
            <div>
              <IconEventNote className={`icon ${css['icon']}`} />
              <p>Add To Calendar</p>
            </div>
          </div>
        </div>

        <div className={css['left-rotated']}>
          <p>ETHEREUM DEVELOPER CONFERENCE</p>
        </div>
        <div className={css['right-rotated']}>
          <p>JOURNEY TO BOGOTA 2021+</p>
        </div>
      </div>
    </div>
  )
}

// Animation resource: https://whoisryosuke.com/blog/2020/handling-scroll-based-animations-in-react/
