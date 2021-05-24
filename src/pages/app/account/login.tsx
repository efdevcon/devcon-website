import React, { lazy, Suspense } from 'react'
import { RouteComponentProps } from '@reach/router'

const Connect = lazy(() => import('src/components/Connect'))

export default function LoginPage(props: RouteComponentProps) {
  const isBrowser = typeof window !== 'undefined'

  return (
    <div>
      <h2>Signin</h2>

      {isBrowser &&
        <Suspense fallback={<div />}>
          <Connect />
        </Suspense>
      }
    </div>
  )
}