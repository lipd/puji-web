import './App.less'
import { ScoreScreen } from 'screens/score'
import { DiscoverScreen } from 'screens/discover'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { AuthScreen } from 'screens/auth'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/score">
          <ScoreScreen />
        </Route>
        <Route path="/sign">
          <AuthScreen />
        </Route>
        <Route path="/">
          <DiscoverScreen />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
