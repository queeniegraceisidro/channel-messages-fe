import { IUserModel, IUserWithAccessTokenModel } from '../api.types'
import { Api } from '../../../infra/api.base'
import { IFormLogin } from '../../../../domain/entities/formModels/signup-form.entity'
import UserEntity, { IUser } from '../../../../domain/entities/user/user.entity'
import { BadRequest } from '../../../infra/api.error'
import { FormRequestError } from '../../../../domain/entities/formModels/errors.entity'
import { mapUserAttributes } from './mappers/user.mappers'
import { LOGIN_URL } from '../constants';


export default class AuthApiGateway extends Api {

  async login(loginCredentials: IFormLogin): Promise<IUser> {
    try {
      const response = await this._loginUser(loginCredentials)
      return this._mapUserFromResponse(response.user)
    } catch (error) {
      if (error instanceof BadRequest) {
        throw new FormRequestError(error.message, error.data)
      }
      throw error
    }
  }

  private async _loginUser(loginCredentials: IFormLogin): Promise<IUserWithAccessTokenModel> {
    return await this.post(LOGIN_URL, loginCredentials)
  }

  private _mapUserFromResponse(response: IUserModel): IUser {
    const user = new UserEntity(mapUserAttributes(response))
    return user.getCurrentValuesAsJSON()
  }
}