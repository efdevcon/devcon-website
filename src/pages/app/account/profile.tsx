import React, { lazy } from 'react'
import { AccountContextProvider } from 'src/context/account-context-provider'

const ProfileComponent = lazy(() => import('src/components/Profile'))

export default function Profile() {
  const isBrowser = typeof window !== 'undefined'

  return (
    <div>
      <h2>Profile</h2>

      {isBrowser && (
        <AccountContextProvider>
          <React.Suspense fallback={<div />}>
            <ProfileComponent />
          </React.Suspense>
        </AccountContextProvider>
      )}
    </div>
  )
}
