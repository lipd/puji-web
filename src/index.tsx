import { AppProvider } from 'context'
import ReactDOM from 'react-dom'
import App from './App'

if (navigator.serviceWorker) {
  navigator.serviceWorker.register('/sw.js')
}

ReactDOM.render(
  <AppProvider>
    <App />
  </AppProvider>,
  document.getElementById('root'),
)
