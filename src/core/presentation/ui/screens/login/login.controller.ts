import AuthApiGateway from "../../../../data/gateways/api/services/auth.gateway";
import AuthRepository from "../../../../data/gateways/api/services/auth.repository";
import { IFormLogin } from "../../../../domain/entities/formModels/signup-form.entity";
import LoginUserUseCase from "../../../../domain/usecases/auth/login.usecase";

export default class LoginController {
  private readonly loginUserUseCase: LoginUserUseCase

  constructor() {
    this.loginUserUseCase = new LoginUserUseCase(
      new AuthApiGateway(),
      new AuthRepository()
    )
  }

  async login(data: IFormLogin) {
    await this.loginUserUseCase.execute(data)
  }

}