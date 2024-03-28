import ChannelApiGateway from "../../../../../data/gateways/api/services/channel.gateway"
import ChannelRepository from "../../../../../data/gateways/api/services/channel.repository"
import CreateChannelUseCase from "../../../../../domain/usecases/channel/create-channel/create-channel.usecase"

export default class CreateChannelModalController {
  private readonly createChannelUseCase: CreateChannelUseCase

  constructor() {
    this.createChannelUseCase = new CreateChannelUseCase(
      new ChannelApiGateway(), new ChannelRepository()
    )
  }

  async createKnowledgebase(data: FormData) {
    const channelName = data.get('channel') as string
    if (channelName) {
      await this.createChannelUseCase.execute(channelName)
    }
  }
}