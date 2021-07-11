import React, { useEffect } from 'react'
import { LogoutButton } from './Logout'
import { FetchingData } from './FetchingData'
import { UserInfo } from './UserInfo'

export const Home: React.FC = () => {

    useEffect(() => {
        window.addEventListener('storage', () => {
            window.location.reload()
          })
    }, [])

    return (
        <>
            <UserInfo />
            <LogoutButton />
            <FetchingData />
        </>
    )
}