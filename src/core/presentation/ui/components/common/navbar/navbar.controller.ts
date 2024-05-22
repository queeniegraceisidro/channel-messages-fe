import AuthApiGateway from "../../../../../data/gateways/api/services/auth.gateway"
import AuthRepository from "../../../../../data/gateways/api/services/auth.repository"
import LogoutUserUseCase from "../../../../../domain/usecases/auth/logout.usecase"

export default class NavbarController {
  private readonly logoutUserUseCase: LogoutUserUseCase

  constructor() {
    this.logoutUserUseCase = new LogoutUserUseCase(
      new AuthApiGateway(), new AuthRepository()
    )
  }

  async logout() {
    await this.logoutUserUseCase.execute()
  }
}