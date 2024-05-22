import ChannelApiGateway from "../../../../../data/gateways/api/services/channel.gateway"
import ChannelRepository from "../../../../../data/gateways/api/services/channel.repository"
import { IFormChannel } from "../../../../../domain/entities/formModels/signup-form.entity"
import CreateChannelUseCase from "../../../../../domain/usecases/channel/create-channel/create-channel.usecase"

export default class CreateChannelModalController {
  private readonly createChannelUseCase: CreateChannelUseCase

  constructor() {
    this.createChannelUseCase = new CreateChannelUseCase(
      new ChannelApiGateway(), new ChannelRepository()
    )
  }

  async createChannel(data: IFormChannel) {
    await this.createChannelUseCase.execute(data.channelName)
  }
}