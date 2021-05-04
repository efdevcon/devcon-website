import React from 'react'
import { RouteComponentProps } from '@reach/router'
import Connect from'src/components/Connect'

export default function Login(props: RouteComponentProps) {
  const isBrowser = typeof window !== 'undefined'

  return (
    <div>
      <h2>Signin</h2>

      {isBrowser && <Connect />}
    </div>
  )
}