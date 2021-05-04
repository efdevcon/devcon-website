import React, { lazy, Suspense } from 'react'
import { RouteComponentProps } from '@reach/router'

const Profile = lazy(() => import('src/components/Profile'))

export default function ProfilePage(props: RouteComponentProps) {
  const isBrowser = typeof window !== 'undefined'

  return (
    <div>
      <h2>Profile</h2>

      {isBrowser &&
        <Suspense fallback={<div />}>
          <Profile />
        </Suspense>
      }
    </div>
  )
}