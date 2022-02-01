import React from 'react'
import { navigate, RouteComponentProps, RouterProps } from '@reach/router'
import { useAccountContext } from 'context/account-context'

interface PrivateRouteProps extends RouteComponentProps<RouterProps> {
  component?: any
  children?: React.ReactChild
}

export const PrivateRoute = ({ component: Component, location, children, ...rest }: PrivateRouteProps) => {
  const accountContext = useAccountContext()
  const loggedIn = !!accountContext.account

  if (!loggedIn && accountContext.loading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    )
  }

  if (!loggedIn && location?.pathname !== `/app/login`) {
    navigate('/app/login' + location?.search)
    return null
  }

  return children || <Component {...rest} />
}
