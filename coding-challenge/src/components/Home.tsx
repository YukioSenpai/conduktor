import { constVoid } from 'fp-ts/lib/function'
import React, { useEffect } from 'react'
import { ConduktorPanel } from './ConduktorPanel'
import { LogoutButton } from './Logout'
import { UserInfo } from './UserInfo'

export const Home: React.FC = () => {
  useEffect(() => {
    window.addEventListener('storage', e => {
      return e.key === 'token' ? window.location.reload() : constVoid
    })
  }, [])

  return (
    <>
      <UserInfo />
      <LogoutButton />
      <ConduktorPanel />
    </>
  )
}
