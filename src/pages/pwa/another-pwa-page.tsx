import { useIntl } from 'gatsby-plugin-intl'
import React from 'react'
import css from './pwa.module.scss'
import IconCheck from 'src/assets/icons/check_circle.svg'
import { Link } from 'src/components/common/link'

const BottomNav = (props: any) => {
  const navItems = [
    {
      title: 'Connect',
      to: 'https://google.com',
    },
    {
      title: 'Schedule',
      to: 'https://google.com',
    },
    {
      title: 'Speakers',
      to: 'https://google.com',
    },
    {
      title: 'Venue',
      to: 'https://google.com',
    },
    {
      title: 'Info',
      to: 'https://google.com',
    },
  ]

  return (
    <div className={css['bottom-nav']}>
      {navItems.map(navItem => {
        return (
          <div className={css['nav-item']}>
            <IconCheck />
            <Link className={css['title']} to={navItem.to}>
              {navItem.title}
            </Link>
          </div>
        )
      })}
    </div>
  )
}

export default function PWA() {
  const intl = useIntl()

  return (
    <div>
      <h1>Another page</h1>
      <BottomNav />
    </div>
  )
}
