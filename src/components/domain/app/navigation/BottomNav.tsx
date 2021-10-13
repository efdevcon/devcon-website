import React from 'react'
import css from './bottom-nav.module.scss'
import IconSwirl from 'src/assets/icons/swirl.svg'
import IconPin from 'src/assets/icons/pin.svg'
import IconSpeakers from 'src/assets/icons/speakers.svg'
import IconInfo from 'src/assets/icons/info-filled.svg'
import IconSchedule from 'src/assets/icons/schedule.svg'
import { Link } from 'src/components/common/link'

const navItems = [
  {
    title: 'Connect',
    icon: IconSwirl,
    to: '/app',
  },
  {
    title: 'Schedule',
    icon: IconSchedule,
    to: '/app/schedule',
  },
  {
    title: 'Speakers',
    icon: IconSpeakers,
    to: '/app/speakers',
  },
  {
    title: 'Venue',
    icon: IconPin,
    to: '/app/venue',
  },
  {
    title: 'Info',
    icon: IconInfo,
    to: '/app/info',
  },
]

export const BottomNav = (props: any) => {
  const [didScrollDown, setDidScrolledDown] = React.useState(false)
  const lastScrollDistance = React.useRef(0)

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollDistance = window.scrollY

      const scrolledDown = currentScrollDistance > lastScrollDistance.current && currentScrollDistance > 0

      if (scrolledDown) {
        if (!didScrollDown) {
          setDidScrolledDown(true)
        }
      } else {
        if (didScrollDown) {
          setDidScrolledDown(false)
        }
      }

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
          const selected = navItem.to === props.location.pathname

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
