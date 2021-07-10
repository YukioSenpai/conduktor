import { useAuth0 } from '@auth0/auth0-react'
import React, { useState } from 'react'
import { Layout } from './components/Layout'
import { LoginButton } from './components/Login'
import { LogoutButton } from './components/Logout'
import { Test } from './components/Test'
import { UserInfo } from './components/UserInfo'
import { LocaleProvider } from './framework/locale-context'

export const App: React.FC = () => {
  const { isAuthenticated } = useAuth0()
  return (
    <LocaleProvider>
      <Layout>
        {isAuthenticated ? 
          <>
            <UserInfo />
            <LogoutButton />
            {/* <Test /> */}
          </> : 
          <LoginButton />
        }
      </Layout>
    </LocaleProvider>
  )
  }
