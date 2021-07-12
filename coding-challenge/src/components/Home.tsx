import React, { useEffect } from 'react'
import { LogoutButton } from './Logout'
import { FetchingData } from './FetchingData'
import { UserInfo } from './UserInfo'
import { constVoid } from 'fp-ts/lib/function'

export const Home: React.FC = () => {

    useEffect(() => {
        window.addEventListener('storage', (e) => {
            return e.key === 'token' ? window.location.reload() : constVoid
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