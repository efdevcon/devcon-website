import React, { lazy, Suspense } from 'react'
import { RouteComponentProps } from '@reach/router'
import { useAccountContext } from 'src/context/account-context'

const Profile = lazy(() => import('src/components/Profile'))

export default function ProfilePage(props: RouteComponentProps) {
  const isBrowser = typeof window !== 'undefined'
  const accountContext = useAccountContext()

  return (
    <div>
      <h2>Profile</h2>
      <a href='#' role='button' onClick={() => accountContext.logout(accountContext.account?._id)}>Logout</a>

      {isBrowser &&
        <Suspense fallback={<div />}>
          <Profile />
        </Suspense>
      }
    </div>
  )
}