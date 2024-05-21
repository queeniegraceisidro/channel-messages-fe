import React from 'react'
import LoginView from './login.view'

export interface ILoginContainerViewModel {
  children?: React.ReactNode
}

export const LoginContainer: React.FC<ILoginContainerViewModel> = (props) => {

  return <LoginView
    children={props.children}
  />
}