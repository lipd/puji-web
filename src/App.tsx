import './App.less'
import { ScoreScreen } from 'screens/score'
import { DiscoverScreen } from 'screens/discover'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { AuthScreen } from 'screens/auth'
import { UploadScreen } from 'screens/upload'
import { UserScreen } from 'screens/user'
import { MineScreen } from 'screens/mine'
import { FavoritesScreen } from 'screens/favorties'
import { PrivateRoute } from 'components/private-route'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/score/:id">
          <ScoreScreen />
        </Route>
        <Route path="/sign">
          <AuthScreen />
        </Route>
        <PrivateRoute path="/upload">
          <UploadScreen />
        </PrivateRoute>
        <PrivateRoute path="/user">
          <UserScreen />
        </PrivateRoute>
        <PrivateRoute path="/mine">
          <MineScreen />
        </PrivateRoute>
        <PrivateRoute path="/favorites">
          <FavoritesScreen />
        </PrivateRoute>
        <Route path="/">
          <DiscoverScreen />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
