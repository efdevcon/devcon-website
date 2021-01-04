import React from 'react'
import css from './hero.module.scss'
import Logo from './svgs/Logo'
import Clouds from './svgs/Clouds'
import Rays from './svgs/Rays'

const parallax = (intersectionRatio: any) => {
  return {
    transform: `translateY(${(100 - intersectionRatio) / 2.5}%)`,
  }
}

// Might want to benchmark SVG performance (should be less CPU intensive to go with pngs, at the cost of not being able to animate)
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
      <Clouds style={parallax(intersectionRatio)} className={css['clouds']} />
      <Rays className={css['rays']} />
      <Logo className={css['logo']} />
    </div>
  )
}

// Animation resource: https://whoisryosuke.com/blog/2020/handling-scroll-based-animations-in-react/
