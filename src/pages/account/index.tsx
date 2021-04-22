import React from 'react'
import { graphql } from 'gatsby'

const LazyConnectComponent = React.lazy(() =>
  import("../../components/Connect")
)

export default function Index({ data }: any) {
  const isSSR = typeof window === "undefined"

  return (
    <div>
      <h2>Login</h2>
      {!isSSR && (
          <React.Suspense fallback={<div />}>
              <LazyConnectComponent />
          </React.Suspense>
      )}
    </div>
  )
}

export const query = graphql`
  query($language: String!) {
    ...NavigationData
    ...NewsData
  }
`
