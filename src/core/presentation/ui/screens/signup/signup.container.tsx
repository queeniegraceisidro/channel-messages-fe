import React from 'react'
import Signup from './signup.view'

export interface ISignupContainerViewModel {
  children?: React.ReactNode
}

export const SignupContainer: React.FC<ISignupContainerViewModel> = (props) => {

  return <Signup
    children={props.children}
  />
}