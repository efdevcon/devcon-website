import React from 'react'
import { Router } from '@reach/router'
import { graphql } from 'gatsby'
import Content from 'src/components/common/layouts/content'
import { AccountContextProvider } from 'src/context/account-context-provider'
import { PrivateRoute } from 'src/components/common/private-route'
import Login from './account/login'
import Profile from './account/profile'
import Attest from './account/attest'
import { Helmet } from 'react-helmet'
import css from './app.module.scss'
import { pageHOC } from 'src/context/pageHOC'

export default pageHOC(function Index({ data, location }: any) {
  const isBrowser = typeof window !== 'undefined'

  return (
    <Content>
      <Helmet>
        <script
          type="text/javascript"
          src="https://unpkg.com/@walletconnect/web3-provider@1.4.1/dist/umd/index.min.js"
        />
        <script type="text/javascript" src="https://unpkg.com/@toruslabs/torus-embed" />
      </Helmet>

      {isBrowser && (
        <div className={css['app']}>
          <AccountContextProvider>
            <div className="section">
              <div className="content">
                <Router basepath="/app">
                  <PrivateRoute path="/profile" component={Profile} />
                  <PrivateRoute path="/attest" component={Attest} />
                  <Login path="/login" default />
                </Router>
              </div>
            </div>
          </AccountContextProvider>
        </div>
      )}
    </Content>
  )
})

export const query = graphql`
  query($language: String!) {
    ...NavigationData
    ...LatestNewsItem
    ...NewsData
  }
`
