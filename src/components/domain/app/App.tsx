import React from 'react'
import { Router } from '@reach/router'
import { AccountContextProvider } from 'src/context/account-context-provider'
import { PrivateRoute } from 'src/components/common/private-route'
import { BottomNav, InlineNav } from 'src/components/domain/app/navigation'
import Profile from './account/profile'
import Attest from './account/attest'
import { Helmet } from 'react-helmet'
import css from './app.module.scss'
import { Header } from 'src/components/common/layouts/header'
import { Home } from 'src/components/domain/app/home'
import { useAccountContext } from 'src/context/account-context'
import { Dashboard } from 'src/components/domain/app/dashboard'
import LoginStyled from './account/LoginStyled'
import { Venue, Room } from './venue'
import { Schedule } from './schedule'
import { Speakers, SpeakerDetails } from './speakers'
import { Session } from 'src/components/domain/app/session'
import { Notifications } from './notifications'
import { Info } from './info'
import { SideEvents } from './side-events'
import Settings from './account/Settings'
import { Session as SessionType } from 'src/types/Session'
import { Speaker } from 'src/types/Speaker'

const accountContextHOC = (Component: React.ComponentType<any>) => {
  return (props: any) => (
    <AccountContextProvider>
      <Component {...props} />
    </AccountContextProvider>
  )
}

/*
  id: string
  speakers: string[]
  title: string
  track: string
  duration: string
  start: Date
  end: Date
  room: string
  type?: string
  description?: string
  abstract?: string
  image?: string
  resources?: string[]
  tags?: string[]
*/

const formatSessionData = (sessions: any): SessionType[] => {
  return sessions.map((session: any) => {
    return session.frontmatter
  })
}

const formatSpeakerData = (speakers: any): Speaker[] => {
  return speakers.map((speaker: any) => {
    return speaker.frontmatter
  })
}

export const App = accountContextHOC(({ data, location }: any) => {
  const isBrowser = typeof window !== 'undefined'
  const accountContext = useAccountContext()
  const loggedIn = !!accountContext.account

  // const { rooms, sessions, speakers } = data
  // const notifications = useNotifications(rooms, sessions, speakers);
  const eventData = {
    rooms: data.rooms.nodes,
    sessions: formatSessionData(data.sessions.nodes),
    speakers: formatSpeakerData(data.speakers.nodes),
  }

  return (
    <>
      <Helmet>
        <script
          type="text/javascript"
          src="https://unpkg.com/@walletconnect/web3-provider@1.4.1/dist/umd/index.min.js"
        />
        <script type="text/javascript" src="https://unpkg.com/@toruslabs/torus-embed" />
      </Helmet>

      <Header className={css['header']} withStrip={false} withHero={false} />

      <InlineNav location={location} />

      {isBrowser && (
        <div className={css['app']}>
          <Router basepath="/app" style={{ minHeight: 'inherit' }}>
            <Home path="/" default />

            {/* Just styling, not connected to functionality - saving that for later to avoid some conflicts
            <LoginStyled path="/conference" /> */}
            <Venue {...eventData} path="/venue" />
            <Room {...eventData} path="/venue/:floor" />
            <Dashboard {...eventData} path="/dashboard" />
            <Schedule {...eventData} path="/schedule" />
            <Session {...eventData} path="/schedule/:session" />
            <Speakers {...eventData} path="/speakers" />
            <SpeakerDetails {...eventData} path="/speakers/:speaker" />
            <Notifications {...eventData} path="/notifications" />
            <Info {...eventData} path="/info" />
            <SideEvents {...eventData} path="/side-events" />

            <LoginStyled path="/login" />
            <PrivateRoute path="/settings" component={Settings} />
            <PrivateRoute path="/profile" component={Profile} />
            <PrivateRoute path="/attest" component={Attest} />
          </Router>

          {loggedIn && <BottomNav location={location} />}
        </div>
      )}
    </>
  )
})
