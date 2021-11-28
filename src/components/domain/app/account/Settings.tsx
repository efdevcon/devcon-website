import React, { lazy, Suspense } from 'react'
import { RouteComponentProps } from '@reach/router'
import { useAccountContext } from 'src/context/account-context'

const Profile = lazy(() => import('src/components/Profile'))

export default function ProfilePage(props: RouteComponentProps) {
  const isBrowser = typeof window !== 'undefined'
  const accountContext = useAccountContext()

  return (
    <div>
      <h2>Account Settings</h2>

    </div>
  )
}
