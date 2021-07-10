import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App'
import { Auth0Provider } from "@auth0/auth0-react"
import { selectPreferredLanguage } from 'typed-intl'

ReactDOM.render(
  <Auth0Provider
    domain="conduktor-coding-challenge.eu.auth0.com"
    clientId="2BczaMeSZzUhOfRfDOFG5QXcfaXQUjmE"
    redirectUri="http://localhost:8000"
  >
    <App />
  </Auth0Provider>,
  document.getElementById('root')
)