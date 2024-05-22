import ChannelApiGateway from "../../../../../data/gateways/api/services/channel.gateway"
import ChannelRepository from "../../../../../data/gateways/api/services/channel.repository"
import { IFormJoinChannel } from "../../../../../domain/entities/formModels/signup-form.entity"
import JoinChannelUseCase from "../../../../../domain/usecases/channel/join-channel/join-channel.usecase"

export default class JoinChannelModalController {
  private readonly joinChannelUseCase: JoinChannelUseCase

  constructor() {
    this.joinChannelUseCase = new JoinChannelUseCase(
      new ChannelApiGateway(), new ChannelRepository()
    )
  }

  async joinChannel(data: IFormJoinChannel) {
    await this.joinChannelUseCase.execute(data)
  }
}