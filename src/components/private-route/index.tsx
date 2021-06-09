import { useAuth } from 'hooks/use-auth'
import React from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'

export const PrivateRoute = ({ children, ...rest }: RouteProps) => {
  const { user } = useAuth()
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/sign',
              state: { from: location },
            }}
          />
        )
      }
    />
  )
}
