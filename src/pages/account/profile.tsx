import React from 'react'
import { graphql } from 'gatsby'
import Content from 'src/components/common/layouts/content'
import { AccountContextProvider } from 'src/context/account-context-provider'

const LazyProfileComponent = React.lazy(() =>
  import("../../components/Profile")
)

export default function Profile({ data }: any) {
  const isBrowser = typeof window !== "undefined"

  return (
    <Content navigationData={data.navigationData}>
      <div>
        <h2>Profile</h2>

        {isBrowser && (
          <AccountContextProvider>
            <React.Suspense fallback={<div />}>
              <LazyProfileComponent />
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

