import { faker } from '@faker-js/faker';
import UserApiGateway from "../../../data/gateways/api/services/user.gateway"
import CreateUserUseCase from "./create-user.usecase"
import UserRepository from "../../../data/gateways/api/services/user.repository"
import { mockAPIResponses } from "../../../data/infra/api-mock";
import { IFormSignUp } from '../../entities/formModels/signup-form.entity';
import { FormRequestError } from '../../entities/formModels/errors.entity';

describe('Test create user use case', () => {
  let gateway: UserApiGateway
  let useCase: CreateUserUseCase
  let repo: UserRepository
  let registrationData: IFormSignUp = {
    'firstName': faker.person.firstName(),
    'lastName': faker.person.lastName(),
    'username': faker.internet.userName(),
    'password1': "r@ndomPassW0rd123",
    'password2': "r@ndomPassW0rd123",
  }

  beforeEach(() => {
    gateway = new UserApiGateway()
    repo = new UserRepository()
  })

  /**
    * Given: Valid user values
    * Expect: A new user created
    */
  test('Execute without errors', async () => {
    // Arrange
    // Mock a request to the api with a success response
    mockAPIResponses(gateway.apiSauce.axiosInstance, false, registrationData)

    // Initialize proper classes before we act in our use case...
    useCase = new CreateUserUseCase(gateway)

    // Act
    const response = await useCase.execute(registrationData)

    // Assert
    // Assert that we have created a new user and that the values are the same
    expect(response.username).toBe(registrationData.username)
    expect(response.firstName).toBe(registrationData.firstName)
    expect(response.lastName).toBe(registrationData.lastName)
  })

  /**
   * Given: Invalid user value
   * Expect: No user created
   */
  test('Execute with error', async () => {
    const simulatedError = "This username is taken."

    // Arrange
    // Mock a request to the api with an error response
    mockAPIResponses(gateway.apiSauce.axiosInstance, true, simulatedError)

    // Initialize proper classes before we act in our use case...
    useCase = new CreateUserUseCase(gateway)

    // Act & Assert
    // Check that FormRequestError is thrown
    expect(async () => await useCase.execute(registrationData)).rejects.toThrow(FormRequestError);
    expect(async () => await useCase.execute(registrationData)).rejects.toThrowError('bad-request');
  })
})