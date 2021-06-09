import { Redirect, Route, RouteProps } from 'react-router-dom'
import { getToken } from 'utils/auth'

export const PrivateRoute = ({ children, ...rest }: RouteProps) => {
  const token = getToken()

  return (
    <Route
      {...rest}
      render={({ location }) =>
        token ? (
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
