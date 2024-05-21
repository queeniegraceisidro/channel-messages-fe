import { IFormSignUp } from '../../entities/formModels/signup-form.entity'

export interface ICreateUserDataGateway {
  createUser: (user: IFormSignUp) => Promise<any>
}

export default class CreateUserUseCase {
  constructor(
    private readonly dataGateway: ICreateUserDataGateway,
  ) {
  }
  async execute(userData: IFormSignUp) {
    return await this.dataGateway.createUser(userData)
  }
}