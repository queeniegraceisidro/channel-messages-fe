import { IUserModel, IUserWithAccessTokenModel } from '../api.types'
import { Api } from '../../../infra/api.base'
import { REGISTER_URL, } from '../constants'
import { IFormSignUp, IFormSignUpError } from '../../../../domain/entities/formModels/signup-form.entity'
import UserEntity, { IUser } from '../../../../domain/entities/user/user.entity'
import { mapUserAttributes, mapUserLoginErrorAttributes } from './mappers/user.mappers'
import { BadRequest } from '../../../infra/api.error'
import { FormRequestError } from '../../../../domain/entities/formModels/errors.entity'
import { IUserLoginErrorModel } from '../api-error.types'

export default class UserApiGateway extends Api {

  async createUser(userDetails: IFormSignUp): Promise<IUser> {
    try {
      const response = await this._createUser(userDetails)
      return this._mapUserFromResponse(response.user)
    } catch (error) {
      if (error instanceof BadRequest) {
        const errorData = this._mapErrorDataFromResponse(error.data)
        throw new FormRequestError(error.message, errorData)
      }
      throw error
    }
  }

  private async _createUser(userDetails: IFormSignUp): Promise<IUserWithAccessTokenModel> {
    return await this.post(REGISTER_URL, userDetails)
  }

  private _mapUserFromResponse(response: IUserModel): IUser {
    const user = new UserEntity(mapUserAttributes(response))
    return user.getCurrentValuesAsJSON()
  }

  private _mapErrorDataFromResponse(response: IUserLoginErrorModel): IFormSignUpError {
    return mapUserLoginErrorAttributes(response)
  }
}