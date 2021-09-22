import React from 'react'
import css from './inline-nav.module.scss'
import IconCheck from 'src/assets/icons/check_circle.svg'
import { HorizontalScroller } from 'src/components/common/horizontal-scroller'
import { Link } from 'src/components/common/link'
import IconSwirl from 'src/assets/icons/swirl.svg'

export const InlineNav = (props: any) => {
  const navItems = [
    {
      title: 'Connect',
      to: '/app',
    },
    {
      title: 'Conference',
      to: '/app/conference',
    },
    {
      title: 'Schedule',
      to: '/app/schedule',
    },
    {
      title: 'Updates',
      to: '/app/updates',
    },
    {
      title: 'Speakers',
      to: '/app/speakers',
    },
    {
      title: 'Venue',
      to: '/app/venue',
    },
    {
      title: 'Side Events',
      to: '/app/side-events',
    },
    {
      title: 'Quests',
      to: '/app/quests',
    },
    {
      title: 'Livestreaming',
      to: '/app/livestreaming',
    },
    {
      title: 'Archive',
      to: '/app/archive',
    },
  ]

  return (
    <div className="section">
      <div className="content">
        <div className="border-bottom">
          <HorizontalScroller>
            <div className={css['inline-nav']}>
              <IconSwirl className={`${css['swirl-icon']} icon`} />
              {navItems.map(navItem => {
                let className = css['nav-item']
                const selected = navItem.to === props.location.pathname

                if (selected) className += ` ${css['selected']}`

                return (
                  <div className={className} key={navItem.to}>
                    <Link className={css['title']} to={navItem.to} allowDrag>
                      {navItem.title}
                    </Link>
                  </div>
                )
              })}
            </div>
          </HorizontalScroller>
        </div>
      </div>
    </div>
  )
}
