import ChannelApiGateway from "../../../../data/gateways/api/services/channel.gateway"
import ChannelRepository from "../../../../data/gateways/api/services/channel.repository"
import CreateChannelMessageUseCase from "./create-message.usecase"
import { mockAPIResponses } from "../../../../data/infra/api-mock"
import { store } from "../../../../presentation/presenters/store/store"
import { faker } from '@faker-js/faker';
import { IFormCreateMessage } from "../../../entities/formModels/signup-form.entity"

describe('Test create channel message use case', () => {
  let gateway: ChannelApiGateway
  let useCase: CreateChannelMessageUseCase
  let repo: ChannelRepository
  let message = faker.word.words()

  beforeEach(() => {
    gateway = new ChannelApiGateway()
    repo = new ChannelRepository()
  })

  /**
   * Given: error
   * Expect: No message created
   */
  test('Execute with error', async () => {
    const simulatedError = {
      message: "This field is required."
    }

    // Arrange
    // Mock a request to the api with an error response
    mockAPIResponses(gateway.apiSauce.axiosInstance, true, simulatedError)

    // Initialize proper classes before we act in our use case...
    useCase = new CreateChannelMessageUseCase(gateway, repo)

    // Assert that we still don't have any message saved in our store
    let state = store.getState()
    expect(state.channelState.messages.length).toBe(0)
  })

  /**
   * Given: random message sent by user
   * Expect: A new channel message is created by user
   */
  test('execute', async () => {
    // Arrange
    // Mock a request to the api with a success response
    const channelMessageData: IFormCreateMessage = {
      channel: 1,
      message: message
    }
    mockAPIResponses(gateway.apiSauce.axiosInstance, false, channelMessageData)

    // Initialize proper classes before we act in our use case...
    useCase = new CreateChannelMessageUseCase(gateway, repo)

    // Check that we don't have any channel state at the moment
    let state = store.getState()
    expect(state.channelState.messages.length).toBe(0)

    // Act
    await useCase.execute(channelMessageData)
    state = store.getState()

    // Assert
    // Assert that we now have 1 channel stored in our store, and it has the same channel name.
    expect(state.channelState.messages.length).toBe(1)
    expect(state.channelState.messages[0]['message']).toBe(message)
  })
})