import { faker } from '@faker-js/faker';
import { mockAPIResponses } from "../../../data/infra/api-mock";
import { IFormLogin } from '../../entities/formModels/signup-form.entity';
import AuthApiGateway from '../../../data/gateways/api/services/auth.gateway';
import AuthRepository from '../../../data/gateways/api/services/auth.repository';
import LoginUserUseCase from './login.usecase';
import { store } from '../../../presentation/presenters/store/store';
import LogoutUserUseCase from './logout.usecase';

describe('Test logout user use case', () => {
  let gateway: AuthApiGateway
  let repo: AuthRepository
  let useCase: LogoutUserUseCase
  let loginUseCase: LoginUserUseCase
  let loginData: IFormLogin = {
    'username': faker.internet.userName(),
    'password': "r@ndomPassW0rd123",
  }

  beforeEach(() => {
    gateway = new AuthApiGateway()
    repo = new AuthRepository()
    useCase = new LogoutUserUseCase(gateway, repo)

    // Login user
    mockAPIResponses(gateway.apiSauce.axiosInstance, false, loginData)
    loginUseCase = new LoginUserUseCase(gateway, repo)
    loginUseCase.execute(loginData)
  })

  /**
    * Given: A currently logged in user
    * Expect: The user is successfully logged out
    */
  test('Execute without errors', async () => {
    // Arrange
    // Check that there is a currently logged in user in the repository
    const currentUser = store.getState().authState.user
    expect(currentUser?.username).toBe(loginData.username)
    // Mock a request to the api with a success response
    mockAPIResponses(gateway.apiSauce.axiosInstance, false)

    // Initialize proper classes before we act in our use case...
    useCase = new LogoutUserUseCase(gateway, repo)

    // Act
    await useCase.execute()

    // Assert
    // Assert that there is no more user saved in our state
    const user = store.getState().authState.user
    expect(user).toBe(null)
  })
})