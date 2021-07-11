import React, { useEffect } from 'react'
import { LogoutButton } from './Logout'
import { Test } from './Test'
import { UserInfo } from './UserInfo'
import { withAuthenticationRequired } from '@auth0/auth0-react'

const Home: React.FC = () => {

    useEffect(() => {
        window.addEventListener('storage', () => {
            window.location.reload()
          })
    }, [])

    return (
        <>
            <UserInfo />
            <LogoutButton />
            <Test />
        </>
    )
}

export default withAuthenticationRequired(Home, {
    // Show a message while the user waits to be redirected to the login page.
    onRedirecting: () => (<div>Redirecting you to the login page...</div>)
  })