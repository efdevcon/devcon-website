import React from 'react'
import { graphql } from 'gatsby'
import Content from 'src/components/common/layouts/content'
import { AccountContextProvider } from 'src/context/account-context-provider'

const LazyConnectComponent = React.lazy(() =>
  import("../../components/Connect")
)

export default function Index({ data }: any) {
  const isBrowser = typeof window !== "undefined"

  return (
    <Content navigationData={data.navigationData}>
      <div>
        <h2>Login</h2>

        {isBrowser && (
          <AccountContextProvider>
            <React.Suspense fallback={<div />}>
              <LazyConnectComponent />
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
