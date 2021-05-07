import React from 'react'
import { Router } from '@reach/router'
import { graphql } from 'gatsby'
import Content from 'src/components/common/layouts/content'
import { AccountContextProvider } from 'src/context/account-context-provider'
import { PrivateRoute } from 'src/components/common/private-route'
import Login from './account/login'
import Profile from './account/profile'
import Attest from './account/attest'
import Confirm from './account/confirm'
import { Helmet } from 'react-helmet'
import css from './app.module.scss'

export default function Index({ data, location }: any) {
  const isBrowser = typeof window !== 'undefined'

  return (
    <Content navigationData={data.navigationData} location={location}>
      <Helmet>
        <script
          type="text/javascript"
          src="https://unpkg.com/@walletconnect/web3-provider@1.4.1/dist/umd/index.min.js" />
        <script
          type="text/javascript"
          src="https://unpkg.com/@toruslabs/torus-embed" />
      </Helmet>

      {isBrowser && (
        <div className={css['app']}>
          <AccountContextProvider>
            <div className="section">
              <div className="content">
                <Router basepath="/app">
                  <PrivateRoute path="/profile" component={Profile} />
                  <PrivateRoute path="/attest" component={Attest} />
                  <PrivateRoute path="/confirm" component={Confirm} />
                  <Login path="/login" />
                </Router>
              </div>
            </div>
          </AccountContextProvider>
        </div>
      )}
    </Content>
  )
}

export const query = graphql`
  query($language: String!) {
    ...NavigationData
    ...NewsData
  }
`
