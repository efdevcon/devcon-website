import React from 'react'
import css from './inline-nav.module.scss'
import IconBack from 'src/assets/icons/arrow_left.svg'
import { HorizontalScroller } from 'src/components/common/horizontal-scroller'
import { Link } from 'src/components/common/link'
import IconSwirl from 'src/assets/icons/swirl.svg'
import { Router, navigate, useMatch, useLocation } from '@reach/router'

const Links = (props: any) => {
  const pathname = props.location.pathname
  const normalizedPathname = pathname[pathname.length - 1] === '/' ? pathname.slice(0, pathname.length - 1) : pathname
  const toRemove = normalizedPathname.split('/').pop()
  const nextPathname = normalizedPathname.replace(toRemove, '')

  return (
    <HorizontalScroller>
      <div className={css['inline-nav']}>
        {props.nested ? (
          <Link to={nextPathname} className={`${css['icon']} icon ${css['nested']}`}>
            <IconBack />
          </Link>
        ) : (
          <IconSwirl className={`${css['icon']} icon`} />
        )}

        {props.links.map((link: any, index: number) => {
          let className = css['nav-item']

          // If there's only one item, we can assume it's selected
          const selected = props.links.length === 1 || link.useIsActive() // link.to === normalizedPathname || props.links.length === 1

          if (selected) className += ` ${css['selected']}`

          // Can optionally pass in a component as a title to dynamically resolve the link text
          const title = link.Title ? link.Title() : link.title

          const body = link.to ? (
            <Link className={css['title']} to={link.to} allowDrag>
              {title}
            </Link>
          ) : (
            <p className={css['title']}>{title}</p>
          )

          return (
            <div className={className} key={link.to || index}>
              {body}
            </div>
          )
        })}
      </div>
    </HorizontalScroller>
  )
}

// Testing custom data resolvers for dynamic routes
const useSession = (id: string | null) => {
  const sessions = [{ id: 'test', title: 'Test session' }]

  return sessions.find(session => session.id === id)
}

export const InlineNav = React.memo((props: any) => {
  return (
    <div id="inline-nav" className={`${css['container']} section`}>
      <div className="content">
        <Router basepath="/app" primary={false}>
          <Links
            path="*"
            links={[
              {
                title: 'Home',
                to: '/app',
                useIsActive: () => {
                  return useMatch('/app')
                },
              },
              {
                title: 'Dashboard',
                to: '/app/dashboard',
                useIsActive: () => {
                  return useMatch('/app/dashboard')
                },
              },
              {
                title: 'Conference',
                to: '/app/conference',
                useIsActive: () => {
                  return useMatch('/app/conference')
                },
              },
              {
                title: 'Schedule',
                to: '/app/schedule',
                useIsActive: () => {
                  return useMatch('/app/schedule/*')
                },
              },
              {
                title: 'Updates',
                to: '/app/updates',
                useIsActive: () => {
                  return useMatch('/app/updates/*')
                },
              },
              {
                title: 'Speakers',
                to: '/app/speakers',
                useIsActive: () => {
                  return useMatch('/app/speakers/*')
                },
              },
              {
                title: 'Venue',
                to: '/app/venue',
                useIsActive: () => {
                  return useMatch('/app/venue/*')
                },
              },
              {
                title: 'Side Events',
                to: '/app/side-events',
                useIsActive: () => {
                  return useMatch('/app/side-events/*')
                },
              },
              {
                title: 'Quests',
                to: '/app/quests',
                useIsActive: () => {
                  return useMatch('/app/quests/*')
                },
              },
              {
                title: 'Livestreaming',
                to: '/app/livestreaming',
                useIsActive: () => {
                  return useMatch('/app/livestreaming/*')
                },
              },
              {
                title: 'Archive',
                to: '/app/archive',
                useIsActive: () => {
                  return useMatch('/app/archive/*')
                },
              },
            ]}
            {...props}
          />

          <Links
            nested
            path="/dashboard"
            links={[
              {
                title: 'Dashboard',
              },
            ]}
          />

          <Links
            nested
            path="/speakers"
            links={[
              {
                title: 'Speakers',
              },
            ]}
          />

          <Links
            nested
            path="/speakers/:speaker"
            links={[
              {
                title: 'Speaker',
              },
            ]}
          />

          <Links
            nested
            path="/schedule"
            links={[
              {
                title: 'Schedule',
              },
            ]}
          />

          <Links
            nested
            path="/info"
            links={[
              {
                title: 'Information',
              },
            ]}
          />

          <Links
            nested
            path="/venue"
            links={[
              {
                title: 'Venue',
              },
            ]}
          />

          <Links
            nested
            path="/side-events"
            links={[
              {
                title: 'Side Events',
              },
            ]}
          />

          <Links
            nested
            path="/schedule/:session"
            links={[
              {
                Title: () => {
                  const match = useMatch('/app/schedule/:session')

                  const session = useSession(match ? match.session : null)

                  return session ? session.title : 'Session'
                },
              },
            ]}
          />
        </Router>
      </div>
    </div>
  )
})
