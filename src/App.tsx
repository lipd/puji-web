import './App.less'
import { ScoreScreen } from 'screens/score'
import { DiscoverScreen } from 'screens/discover'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { AuthScreen } from 'screens/auth'
import { UploadScreen } from 'screens/upload'
import { UserScreen } from 'screens/user'
import { MineScreen } from 'screens/mine'
import { FavoritesScreen } from 'screens/favorties'

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
        <Route path="/upload">
          <UploadScreen />
        </Route>
        <Route path="/user">
          <UserScreen />
        </Route>
        <Route path="/mine">
          <MineScreen />
        </Route>
        <Route path="/favorites">
          <FavoritesScreen />
        </Route>
        <Route path="/">
          <DiscoverScreen />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
