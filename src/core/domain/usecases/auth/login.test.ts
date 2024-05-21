import { faker } from '@faker-js/faker';
import { mockAPIResponses } from "../../../data/infra/api-mock";
import { IFormLogin } from '../../entities/formModels/signup-form.entity';
import AuthApiGateway from '../../../data/gateways/api/services/auth.gateway';
import AuthRepository from '../../../data/gateways/api/services/auth.repository';
import LoginUserUseCase from './login.usecase';
import { store } from '../../../presentation/presenters/store/store';
import { clearUser } from '../../../presentation/presenters/store/reducers/auth.reducer';

describe('Test login user use case', () => {
  let gateway: AuthApiGateway
  let repo: AuthRepository
  let useCase: LoginUserUseCase
  let loginData: IFormLogin = {
    'username': faker.internet.userName(),
    'password': "r@ndomPassW0rd123",
  }

  beforeEach(() => {
    gateway = new AuthApiGateway()
    repo = new AuthRepository()
    store.dispatch(clearUser())
  })

  /**
    * Given: Valid user credentials
    * Expect: The user is successfully logged in
    */
  test('Execute without errors', async () => {
    // Arrange
    // Mock a request to the api with a success response
    mockAPIResponses(gateway.apiSauce.axiosInstance, false, loginData)

    // Initialize proper classes before we act in our use case...
    useCase = new LoginUserUseCase(gateway, repo)

    // Act
    await useCase.execute(loginData)

    // Assert
    // Assert that the new user is saved to our store
    const user = store.getState().authState.user
    expect(user?.username).toBe(loginData.username)
  })

  /**
   * Given: Invalid user credentials
   * Expect: The user is not logged in
   */
  test('Execute with error', async () => {
    const simulatedError = "Unable to login with the provided credentials."

    // Arrange
    // Mock a request to the api with an error response
    mockAPIResponses(gateway.apiSauce.axiosInstance, true, simulatedError)

    // Initialize proper classes before we act in our use case...
    useCase = new LoginUserUseCase(gateway, repo)

    // Assert that we don't have any user set in our store
    const user = store.getState().authState.user
    expect(user).toBe(null)
  })
})