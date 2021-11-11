import React from 'react'
import { Router } from '@reach/router'
import { AccountContextProvider } from 'src/context/account-context-provider'
import { PrivateRoute } from 'src/components/common/private-route'
import { BottomNav, InlineNav } from 'src/components/domain/app/navigation'
import Login from './account/login'
import Profile from './account/profile'
import Attest from './account/attest'
import { Helmet } from 'react-helmet'
import css from './app.module.scss'
import { Header } from 'src/components/common/layouts/header'
import { Home } from 'src/components/domain/app/home'
import { useAccountContext } from 'src/context/account-context'
import LoginStyled from './account/LoginStyled'
import { Schedule, useSyncSchedule } from './schedule'
import { Venue } from './venue'
import { Speakers, SpeakerDetails } from './speakers'
import { Session } from 'src/components/domain/app/session'
import useGetElementHeight from 'src/hooks/useGetElementHeight'
import { useDidScrollDown, useIsScrolled, useScrollY } from 'src/hooks/useIsScrolled'
import { Notifications } from './notifications'
import { Info } from './info'
import { SideEvents } from './side-events'

const accountContextHOC = (Component: React.ComponentType<any>) => {
  return (props: any) => (
    <AccountContextProvider>
      <Component {...props} />
    </AccountContextProvider>
  )
}

export const App = accountContextHOC(({ data, location }: any) => {
  const isBrowser = typeof window !== 'undefined'
  const accountContext = useAccountContext()
  const loggedIn = accountContext.account || true /* Forcing logged in for dev purposes */

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
      {loggedIn && <InlineNav location={location} />}

      {isBrowser && (
        <div className={css['app']}>
          <Router basepath="/app" style={{ minHeight: 'inherit' }}>
            <Login path="/login" default />

            {/* Just styling, not connected to functionality - saving that for later to avoid some conflicts */}
            <LoginStyled path="/conference" />

            <Venue path="/venue" />
            <Schedule path="/schedule" />
            <Session path="/schedule/:session" />
            <Speakers path="/speakers" />
            <SpeakerDetails path="/speakers/:speaker" />
            <Notifications path="/notifications" />
            <Info path="/info" />
            <SideEvents path="/side-events" />

            <Home path="/" />

            <PrivateRoute path="/profile" component={Profile} />
            <PrivateRoute path="/attest" component={Attest} />
          </Router>

          {loggedIn && <BottomNav location={location} />}
        </div>
      )}
    </>
  )
})
