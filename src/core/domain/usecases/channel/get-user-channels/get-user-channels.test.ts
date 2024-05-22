import ChannelApiGateway from "../../../../data/gateways/api/services/channel.gateway"
import ChannelRepository from "../../../../data/gateways/api/services/channel.repository"
import { mockAPIResponses } from "../../../../data/infra/api-mock"
import { store } from "../../../../presentation/presenters/store/store"
import { faker } from '@faker-js/faker';
import GetUserChannelsUseCase from "./get-user-channels.usecase"

describe('Test get all the user channels use case', () => {
  let gateway: ChannelApiGateway
  let useCase: GetUserChannelsUseCase
  let repo: ChannelRepository
  let channel = faker.word.words()

  beforeEach(() => {
    gateway = new ChannelApiGateway()
    repo = new ChannelRepository()
  })

  /**
   * Given: Error
   * Expect: No channel retrieved
   */
  test('Execute with error', async () => {
    const simulatedError = {
      name: "No channels found."
    }

    // Arrange
    // Mock a request to the api with an error response
    mockAPIResponses(gateway.apiSauce.axiosInstance, true, simulatedError)

    // Initialize proper classes before we act in our use case...
    useCase = new GetUserChannelsUseCase(
      gateway, repo
    )

    // Assert still have no channels in our store
    let state = store.getState()
    expect(state.channelState.channels.length).toBe(0)
  })

  /**
   * Given: Logged-in user that has joined 3 channels
   * Expect: A list of all the user's joined channel is retrieved
   */
  test('execute', async () => {
    // Arrange
    // Mock a request to the api with a success response
    mockAPIResponses(gateway.apiSauce.axiosInstance, false, channel)

    // Initialize proper classes before we act in our use case...
    useCase = new GetUserChannelsUseCase(
      gateway, repo
    )

    // Check that we don't have any channel state at the moment
    let state = store.getState()
    expect(state.channelState.channels.length).toBe(0)

    // Act
    await useCase.execute()
    state = store.getState()

    // Assert
    // Assert that the number of channels has the same with the channels joined by the user
    expect(state.channelState.channels.length).toBe(3)
  })
})