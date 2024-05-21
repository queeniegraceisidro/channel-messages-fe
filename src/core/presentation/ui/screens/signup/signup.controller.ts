import UserApiGateway from "../../../../data/gateways/api/services/user.gateway"
import CreateUserUseCase from "../../../../domain/usecases/user/create-user.usecase"
import { IFormSignUp } from "../../../../domain/entities/formModels/signup-form.entity"


export default class SignupController {
  private readonly createUserUseCase: CreateUserUseCase

  constructor() {
    this.createUserUseCase = new CreateUserUseCase(
      new UserApiGateway()
    )
  }

  async createUser(data: IFormSignUp) {
    await this.createUserUseCase.execute(data)
  }

}