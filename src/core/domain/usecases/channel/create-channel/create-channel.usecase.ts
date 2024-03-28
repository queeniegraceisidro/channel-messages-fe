import { IChannel } from '../../../entities/channel/channel.entity'


export interface ICreateChannelDataGateway {
  createChannel: (channelName: string) => Promise<any>
}

export interface ICreateChannelDataRepository {
  setChannel: (newChannel: IChannel) => void
}

export default class CreateChannelUseCase {
  constructor(
    private readonly dataGateway: ICreateChannelDataGateway,
    private readonly dataRepository: ICreateChannelDataRepository,
  ) {
  }
  async execute(channelName: string) {
    try {
      const newChannel = await this.dataGateway.createChannel(channelName)
      this.dataRepository.setChannel(newChannel)
    } catch (error: any) {
      console.log({ error })
    }
  }
}