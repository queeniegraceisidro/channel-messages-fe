export interface IAuthLogoutDataGateway {
  logout: () => Promise<any>
}

export interface ILoginUserDataRepository {
  clearUser: () => void
}

export default class LogoutUserUseCase {
  constructor(
      private readonly dataGateway: IAuthLogoutDataGateway,
      private readonly dataRepository: ILoginUserDataRepository
  ) {
  }
  async execute() {
      try {
          const resp = await this.dataGateway.logout()
          this.dataRepository.clearUser()
          return resp
      } catch (error) {
          throw error
      }
  }
}