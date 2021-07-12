import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App'
import { Auth0Provider } from "@auth0/auth0-react"
import { selectPreferredLanguage } from 'typed-intl'
import * as dotenv from 'dotenv'
import 'antd/dist/antd.css';
import { store } from './store/store'
import { Provider } from 'react-redux'

dotenv.config()

selectPreferredLanguage(['fr', 'en'])

ReactDOM.render(
  <Auth0Provider
    domain="conduktor-coding-challenge.eu.auth0.com"
    clientId="2BczaMeSZzUhOfRfDOFG5QXcfaXQUjmE"
    redirectUri="http://localhost:8000"
    cacheLocation="localstorage"
    useRefreshTokens={true}
  >
    <Provider store={store}>
      <App />
    </Provider>
  </Auth0Provider>,
  document.getElementById('root')
)
