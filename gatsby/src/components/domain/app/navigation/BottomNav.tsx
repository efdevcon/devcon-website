import React from 'react'
import css from './bottom-nav.module.scss'
import IconSwirl from 'src/assets/icons/swirl.svg'
import IconPin from 'src/assets/icons/pin.svg'
import IconSpeakers from 'src/assets/icons/speakers.svg'
import IconHome from 'src/assets/icons/home.svg'
import IconInfo from 'src/assets/icons/info-filled.svg'
import IconSchedule from 'src/assets/icons/schedule.svg'
import { Link } from 'src/components/common/link'
import { useMatch } from '@reach/router'

const navItems = [
  {
    title: 'Home',
    icon: IconHome,
    to: '/app',
    useIsActive: () => {
      return useMatch('/app')
    },
  },
  {
    title: 'Schedule',
    icon: IconSchedule,
    to: '/app/schedule',
    useIsActive: () => {
      return useMatch('/app/schedule/*')
    },
  },
  {
    title: 'Speakers',
    icon: IconSpeakers,
    to: '/app/speakers',
    useIsActive: () => {
      return useMatch('/app/speakers/*')
    },
  },
  {
    title: 'Venue',
    icon: IconPin,
    to: '/app/venue',
    useIsActive: () => {
      return useMatch('/app/venue/*')
    },
  },
  {
    title: 'Info',
    icon: IconInfo,
    to: '/app/info',
    useIsActive: () => {
      return useMatch('/app/info/*')
    },
  },
]

export const BottomNav = (props: any) => {
  const [didScrollDown, setDidScrollDown] = React.useState(false)
  const lastScrollDistance = React.useRef(0)

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollDistance = window.scrollY

      const scrolledDown = currentScrollDistance > lastScrollDistance.current && currentScrollDistance > 0

      // const fullyScrolled = window.innerHeight + currentScrollDistance >= document.body.offsetHeight
      const fullHeightIncludingScroll = document.body.offsetHeight

      // If scrolling is barely possible (due to not that much vertical content), we don't animate the menu in and out (it feels bad) - we allow a decent threshold before activating animations
      const contentTooShort = fullHeightIncludingScroll < window.innerHeight * 1.3
      // const isScrollBounce = currentScrollDistance + window.innerHeight >= fullHeightIncludingScroll

      if (contentTooShort /* || isScrollBounce*/) return

      if (scrolledDown) {
        if (!didScrollDown) {
          setDidScrollDown(true)
        }
      } else {
        if (didScrollDown) {
          setDidScrollDown(false)
        }
      }

      // if (fullyScrolled && lastScrollDistance.current < 0) {
      //   setDidScrollDown(false)
      // }

      lastScrollDistance.current = currentScrollDistance
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [didScrollDown])

  let className = css['bottom-nav']

  if (didScrollDown) className += ` ${css['hide']}`

  return (
    <div className={className}>
      <div className={css['items']}>
        {navItems.map(navItem => {
          let className = css['nav-item']

          const selected = navItem.useIsActive() // normalizedPathname.includes(navItem.to)

          if (selected) className += ` ${css['selected']}`

          return (
            <Link className={className} key={navItem.to} to={navItem.to}>
              <navItem.icon />
              <span className={css['title']}>{navItem.title}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
