import './App.less'
import { Layout } from 'layout'
import { ScoreScreen } from 'screens/score'
// import { DiscoverScreen } from 'screens/discover'

function App() {
  return (
    <Layout footer={false}>
      {/* <DiscoverScreen /> */}
      <ScoreScreen />
    </Layout>
  )
}

export default App
