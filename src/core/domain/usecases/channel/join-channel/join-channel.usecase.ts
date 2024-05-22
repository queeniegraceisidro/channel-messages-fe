import { IChannel } from '../../../entities/channel/channel.entity'
import { IFormJoinChannel } from '../../../entities/formModels/signup-form.entity'


export interface IJoinChannelDataGateway {
  joinChannel: (inviteCodeParams: IFormJoinChannel) => Promise<any>
}

export interface IJoinChannelDataRepository {
  setChannel: (joinedChannel: IChannel) => void
}

export default class JoinChannelUseCase {
  constructor(
    private readonly dataGateway: IJoinChannelDataGateway,
    private readonly dataRepository: IJoinChannelDataRepository,
  ) {
  }
  async execute(inviteCodeParams: IFormJoinChannel) {
    const joinedChannel = await this.dataGateway.joinChannel(inviteCodeParams)
    this.dataRepository.setChannel(joinedChannel)
  }
}