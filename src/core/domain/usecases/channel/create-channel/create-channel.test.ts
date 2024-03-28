import ChannelApiGateway from "../../../../data/gateways/api/services/channel.gateway"
import ChannelRepository from "../../../../data/gateways/api/services/channel.repository"
import CreateChannelUseCase from "./create-channel.usecase"
import { mockAPIResponses } from "../../../../data/infra/api-mock"
import { store } from "../../../../presentation/presenters/store/store"
import { faker } from '@faker-js/faker';

describe('Test create channel use case', () => {
  let gateway: ChannelApiGateway
  let useCase: CreateChannelUseCase
  let repo: ChannelRepository
  let channel = faker.word.words()

  beforeEach(() => {
    gateway = new ChannelApiGateway()
    repo = new ChannelRepository()
  })

  /**
   * Given: error
   * Expect: No channel created
   */
  test('Execute with error', async () => {
    const simulatedError = {
      name: "This field is required."
    }

    // Arrange
    // Mock a request to the api with an error response
    mockAPIResponses(gateway.apiSauce.axiosInstance, true, simulatedError)

    // Initialize proper classes before we act in our use case...
    useCase = new CreateChannelUseCase(
      gateway, new ChannelRepository()
    )

    // Assert that we now have 0 channels stored in our store
    let state = store.getState()
    expect(state.channelState.channel.results.length).toBe(0)
  })

  /**
   * Given: channel_name
   * Expect: A new channel created from the channel name
   */
  test('execute', async () => {
    // Arrange
    // Mock a request to the api with a success response
    mockAPIResponses(gateway.apiSauce.axiosInstance, false, channel)

    // Initialize proper classes before we act in our use case...
    useCase = new CreateChannelUseCase(
      gateway, new ChannelRepository()
    )

    // Check that we don't have any channel state at the moment
    let state = store.getState()
    expect(state.channelState.channel.results.length).toBe(0)

    // Act
    await useCase.execute(channel)
    state = store.getState()

    // Assert
    // Assert that we now have 1 channel stored in our store, and it has the same channel name.
    expect(state.channelState.channel.results.length).toBe(1)
    expect(state.channelState.channel.results[0].name).toBe(channel)
  })
})