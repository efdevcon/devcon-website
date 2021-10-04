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

  const schedule = useSyncSchedule()

  return (
    <>
      <Helmet>
        <script
          type="text/javascript"
          src="https://unpkg.com/@walletconnect/web3-provider@1.4.1/dist/umd/index.min.js"
        />
        <script type="text/javascript" src="https://unpkg.com/@toruslabs/torus-embed" />
      </Helmet>

      <Header withStrip={false} withHero={false} />

      {schedule}

      {isBrowser && (
        <div className={css['app']}>
          {loggedIn && <InlineNav location={location} />}

          <Router basepath="/app" style={{ minHeight: 'inherit' }}>
            <Login path="/login" default />

            {/* Just styling, not connected to functionality - saving that for later to avoid some conflicts */}
            <LoginStyled path="/conference" />

            <Venue path="/venue" />
            <Schedule path="/schedule" />

            <Home path="/" />

            <PrivateRoute path="/profile" component={Profile} />
            <PrivateRoute path="/attest" component={Attest} />
          </Router>

          {loggedIn && <BottomNav />}
        </div>
      )}
    </>
  )
})
