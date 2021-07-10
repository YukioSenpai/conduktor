import React from 'react'
import { LoginButton } from './components/Login'
import { LogoutButton } from './components/Logout';
import { Test } from './components/Test';
import { UserInfo } from './components/UserInfo';

export const App: React.FC = () => {
  return (
    <div>
      <LoginButton />
      <LogoutButton />
      <UserInfo />
      <Test />
    </div>
  );
}
