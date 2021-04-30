import './App.less'
import { Layout } from 'layout'
import { ScoreScreen } from 'screens/score'
import { DiscoverScreen } from 'screens/discover'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/score">
          <ScoreScreen />
        </Route>
        <Route path="/">
          <DiscoverScreen />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
