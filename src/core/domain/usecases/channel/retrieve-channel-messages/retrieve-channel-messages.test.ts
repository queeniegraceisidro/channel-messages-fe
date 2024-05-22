import ChannelApiGateway from "../../../../data/gateways/api/services/channel.gateway"
import ChannelRepository from "../../../../data/gateways/api/services/channel.repository"
import { mockAPIResponses } from "../../../../data/infra/api-mock"
import { store } from "../../../../presentation/presenters/store/store"
import RetrieveChannelMessagesUseCase from "./retrieve-channel-messages.usecase";

describe('Test retrieve channel messages use case', () => {
  let gateway: ChannelApiGateway
  let useCase: RetrieveChannelMessagesUseCase
  let repo: ChannelRepository

  beforeEach(() => {
    gateway = new ChannelApiGateway()
    repo = new ChannelRepository()
  })

  /**
   * Given: Error in retrieving channel messages
   * Expect: Cannot retrieve channel messages
   */
  test('Execute with error', async () => {

    // Arrange
    // Mock a request to the api with an error response
    mockAPIResponses(gateway.apiSauce.axiosInstance, true)

    // Initialize proper classes before we act in our use case...
    useCase = new RetrieveChannelMessagesUseCase(gateway, repo)

    // Assert that we now have 0 messages stored in our store
    let state = store.getState()
    expect(state.channelState.messages.length).toBe(0)
  })

  /**
   * Given: A channel member is viewing the channel's messages
   * Expect: The list of the channel's messages can be seen by the channel member
   */
  test('execute', async () => {
    // Arrange
    // Initialize the current channel
    const channelId = 1
    const nextMessageCursor = 'cD0yMDI0LTA1LTA0KzA4JTNBMDMlM0EzNy4wNjk4NzUlMkIwMCUzQTAw'
    // Mock a request to the api with a success response
    mockAPIResponses(gateway.apiSauce.axiosInstance, false, {}, channelId)

    // Initialize proper classes before we act in our use case...
    useCase = new RetrieveChannelMessagesUseCase(gateway, repo)

    // Check that we don't have any channel messages on our state at the moment
    let state = store.getState()
    expect(state.channelState.messages.length).toBe(0)

    // Act
    await useCase.execute(channelId, null)
    state = store.getState()

    // Assert
    // Assert that our state contains channel messages
    expect(state.channelState.messages.length).toBeGreaterThan(0)
    // Assert that our state contains a next message cursor
    expect(state.channelState.nextMessageCursor).toBe(nextMessageCursor)
  })
})