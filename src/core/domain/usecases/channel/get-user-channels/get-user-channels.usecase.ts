import { IChannel } from '../../../entities/channel/channel.entity'


export interface IGetUserChannelsDataGateway {
  getUserChannels: () => Promise<any>
}

export interface IGetUserChannelsDataRepository {
  initializeUserChannels: (channels: IChannel[]) => void
}

export default class GetUserChannelsUseCase {
  constructor(
    private readonly dataGateway: IGetUserChannelsDataGateway,
    private readonly dataRepository: IGetUserChannelsDataRepository,
  ) {
  }
  async execute() {
    try {
      const userChannels = await this.dataGateway.getUserChannels()
      let channels: IChannel[] = []
      userChannels.results.forEach((result: { channel: any }) => {
        channels.push(result.channel)
      });
      this.dataRepository.initializeUserChannels(channels)
    } catch (error: any) {
      throw error
    }
  }
}