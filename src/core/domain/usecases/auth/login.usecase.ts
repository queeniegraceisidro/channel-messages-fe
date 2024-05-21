import { BadRequest } from '../../../data/infra/api.error'
import { IAuthState } from '../../entities/auth/auth.entity'
import { FormRequestError } from '../../entities/formModels/errors.entity'
import { IFormLogin } from '../../entities/formModels/signup-form.entity'


export interface IAuthLoginDataGateway {
  login: (user: IFormLogin) => Promise<any>
}

export interface ILoginUserDataRepository {
  setUser: (newUser: IAuthState) => void
}

export default class LoginUserUseCase {
  constructor(
    private readonly dataGateway: IAuthLoginDataGateway,
    private readonly dataRepository: ILoginUserDataRepository
  ) {
  }
  async execute(userData: IFormLogin) {
    try {
      const resp = await this.dataGateway.login(userData)
      this.dataRepository.setUser({ 'user': resp })
      return resp
    } catch (error) {
      if (error instanceof BadRequest) {
        throw new FormRequestError(error.message, error.data)
      }
      throw error
    }
  }
}