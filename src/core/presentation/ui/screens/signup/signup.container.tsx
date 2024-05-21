import Signup from './signup.view'
import { IFormSignUp } from '../../../../domain/entities/formModels/signup-form.entity'
import SignupController from './signup.controller'

export interface ISignupContainerViewModel {
  children?: React.ReactNode
}

export const SignupContainer: React.FC<ISignupContainerViewModel> = (props) => {

  const controller = new SignupController()
   const handleSubmit = async (values: IFormSignUp) => {
      await controller.createUser(values)
   };

  return <Signup
    children={props.children}
    handleSubmit={handleSubmit}
  />
}