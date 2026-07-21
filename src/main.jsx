import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { initAttribution } from './lib/attribution.js'
import './globals.css'

// Capture UTMs / click ids from this landing (or a saved cookie) and
// install a click-time href rewriter so any outbound link to a
// getdragonbot.com URL (LP → LP or LP → app.getdragonbot.com) carries
// them through to the sign-up destination. See src/lib/attribution.js.
initAttribution()

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)