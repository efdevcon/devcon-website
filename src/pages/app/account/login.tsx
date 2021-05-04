import React, { lazy } from 'react'
import { RouteComponentProps } from '@reach/router'
import { AccountContextProvider } from 'src/context/account-context-provider'

const Connect = lazy(() => import('src/components/Connect'))

export default function Login(props: RouteComponentProps) {
  const isBrowser = typeof window !== 'undefined'

  return (
    <div>
      <h2>Signin</h2>

      {isBrowser && (
        <AccountContextProvider>
          <React.Suspense fallback={<div />}>
            <Connect />
          </React.Suspense>
        </AccountContextProvider>
      )}
    </div>
  )
}
