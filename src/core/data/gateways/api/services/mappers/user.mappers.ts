import { IFormSignUpError } from '../../../../../domain/entities/formModels/signup-form.entity'
import { IUserLoginErrorModel } from '../../api-error.types'
import { IUserModel } from '../../api.types'

export const mapUserAttributes = (initialModel: IUserModel) => {
  return {
    id: initialModel.id,
    firstName: initialModel.first_name,
    lastName: initialModel.last_name,
    username: initialModel.username
  }
}

export const mapUserLoginErrorAttributes = (initialModel: IUserLoginErrorModel): IFormSignUpError => {
  return {
    nonFieldErrors: initialModel.non_field_errors,
    firstName: initialModel.first_name,
    lastName: initialModel.last_name,
    username: initialModel.username,
    password1: initialModel.password_1,
    password2: initialModel.password_2
  }
}