import React from 'react'
import { graphql } from 'gatsby'
import Content from 'src/components/common/layouts/content'
import { AccountContextProvider } from 'src/context/account-context-provider'

export default function Attest({ data }: any) {
  const isBrowser = typeof window !== "undefined"

  return (
    <Content navigationData={data.navigationData}>
      <div>
        <h2>Attest Ticket</h2>

        {isBrowser && (
          <AccountContextProvider>
            <React.Suspense fallback={<div />}>
              <p>Attest your ticket, using your web3 account.</p>
            </React.Suspense>
          </AccountContextProvider>
        )}
      </div>
    </Content>
  )
}

export const query = graphql`
  query($language: String!) {
    ...NavigationData
    ...NewsData
  }
`