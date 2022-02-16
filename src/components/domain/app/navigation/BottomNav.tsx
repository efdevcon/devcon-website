import React from 'react'
import css from './bottom-nav.module.scss'
import IconPin from 'assets/icons/pin.svg'
import IconSpeakers from 'assets/icons/speakers.svg'
import IconHome from 'assets/icons/home.svg'
import IconInfo from 'assets/icons/info-filled.svg'
import IconSchedule from 'assets/icons/schedule.svg'
import { Link } from 'components/common/link'

const navItems = [
  {
    title: 'Home',
    icon: IconHome,
    to: '/app',
    useIsActive: () => {
      return false
    },
  },
  {
    title: 'Schedule',
    icon: IconSchedule,
    to: '/app/schedule',
    useIsActive: () => {
      return false
    },
  },
  {
    title: 'Speakers',
    icon: IconSpeakers,
    to: '/app/speakers',
    useIsActive: () => {
      return false
    },
  },
  {
    title: 'Venue',
    icon: IconPin,
    to: '/app/venue',
    useIsActive: () => {
      return false
    },
  },
  {
    title: 'Info',
    icon: IconInfo,
    to: '/app/info',
    useIsActive: () => {
      return false
      // return useMatch('/app/info/*')
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
              <>
                <navItem.icon />
                <span className={css['title']}>{navItem.title}</span>
              </>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
