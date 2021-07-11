import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Home } from './components/Home'
import { Layout } from './components/Layout'
import { LoginButton } from './components/Login'

import { LocaleProvider } from './framework/locale-context'

export const App: React.FC = () => {
  const { isAuthenticated } = useAuth0()

  return (
    <LocaleProvider>
      <Layout>
        {isAuthenticated ? 
          <Home />
        : 
          <LoginButton />
        }
      </Layout>
    </LocaleProvider>
  )
  }
