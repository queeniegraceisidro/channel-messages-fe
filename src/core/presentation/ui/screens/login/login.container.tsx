import React from 'react'
import LoginView from './login.view'
import LoginController from './login.controller'
import { IFormLogin } from '../../../../domain/entities/formModels/signup-form.entity'


export interface ILoginContainerViewModel {
  children?: React.ReactNode
}

export const LoginContainer: React.FC<ILoginContainerViewModel> = (props) => {

  const controller = new LoginController()
  const handleSubmit = async (values: IFormLogin) => {
     await controller.login(values)
  };

  return <LoginView
    children={props.children}
    handleSubmit={handleSubmit}
  />
}