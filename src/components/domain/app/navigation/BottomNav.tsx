import React from 'react'
import css from './bottom-nav.module.scss'
import IconSwirl from 'src/assets/icons/swirl.svg'
import IconPin from 'src/assets/icons/pin.svg'
import IconSpeakers from 'src/assets/icons/speakers.svg'
import IconInfo from 'src/assets/icons/info-filled.svg'
import IconSchedule from 'src/assets/icons/schedule.svg'

import { Link } from 'src/components/common/link'

export const BottomNav = (props: any) => {
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

  return (
    <div className={css['bottom-nav']}>
      <div className={css['items']}>
        {navItems.map(navItem => {
          return (
            <Link className={css['nav-item']} key={navItem.to} to={navItem.to}>
              <navItem.icon />
              <span className={css['title']}>{navItem.title}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
