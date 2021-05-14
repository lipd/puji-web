import { AppProvider } from 'context'
import ReactDOM from 'react-dom'
import App from './App'

ReactDOM.render(
  <AppProvider>
    <App />
  </AppProvider>,
  document.getElementById('root'),
)
