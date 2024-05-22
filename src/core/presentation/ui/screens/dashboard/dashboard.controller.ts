import ChannelApiGateway from "../../../../data/gateways/api/services/channel.gateway"
import ChannelRepository from "../../../../data/gateways/api/services/channel.repository"
import GetUserChannelsUseCase from "../../../../domain/usecases/channel/get-user-channels/get-user-channels.usecase"


export default class DashboardController {
  private readonly getUserChannelsUseCase: GetUserChannelsUseCase

  constructor() {
    this.getUserChannelsUseCase = new GetUserChannelsUseCase(
      new ChannelApiGateway(),
      new ChannelRepository()
    )
  }

  async getUserChannels() {
    await this.getUserChannelsUseCase.execute()
  }
}