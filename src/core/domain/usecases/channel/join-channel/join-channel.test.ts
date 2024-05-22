import ChannelApiGateway from "../../../../data/gateways/api/services/channel.gateway"
import ChannelRepository from "../../../../data/gateways/api/services/channel.repository"
import { mockAPIResponses } from "../../../../data/infra/api-mock"
import { store } from "../../../../presentation/presenters/store/store"
import JoinChannelUseCase from "./join-channel.usecase";
import { IFormJoinChannel } from "../../../entities/formModels/signup-form.entity";

describe('Test create channel use case', () => {
  let gateway: ChannelApiGateway
  let useCase: JoinChannelUseCase
  let repo: ChannelRepository
  let inviteCode = 'invite123'
  let channelName = 'New Channel'
  let joinChannelData: IFormJoinChannel = {
    'inviteCode': inviteCode,
  }
  let mockChannelData = {
    'code': inviteCode,
    'name': channelName
  }

  beforeEach(() => {
    gateway = new ChannelApiGateway()
    repo = new ChannelRepository()
  })

  /**
   * Given: error
   * Expect: No channel joined
   */
  test('Execute with error', async () => {
    const simulatedError = {
      invite_code: "Invalid code. Please try another code."
    }

    // Arrange
    // Mock a request to the api with an error response
    mockAPIResponses(gateway.apiSauce.axiosInstance, true, simulatedError)

    // Initialize proper classes before we act in our use case...
    useCase = new JoinChannelUseCase(
      gateway, new ChannelRepository()
    )

    // Assert that we now have 0 channels stored in our store
    let state = store.getState()
    expect(state.channelState.channels.length).toBe(0)
  })

  /**
   * Given: invite_code
   * Expect: A new channel is added to the user's list of channels
   */
  test('execute', async () => {
    // Arrange
    // Mock a request to the api with a success response
    mockAPIResponses(gateway.apiSauce.axiosInstance, false, mockChannelData)

    // Initialize proper classes before we act in our use case...
    useCase = new JoinChannelUseCase(
      gateway, new ChannelRepository()
    )

    // Check that we don't have any channel state at the moment
    let state = store.getState()
    expect(state.channelState.channels.length).toBe(0)

    // Act
    await useCase.execute(joinChannelData)
    state = store.getState()

    // Assert
    // Assert that we now have 1 channel stored in our store, and it has the same channel name.
    expect(state.channelState.channels.length).toBe(1)
    expect(state.channelState.channels[0].name).toBe(channelName)
    expect(state.channelState.channels[0].inviteCode).toBe(inviteCode)
  })
})