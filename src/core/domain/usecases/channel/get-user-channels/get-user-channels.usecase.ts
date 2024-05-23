import { IPagedChannelEntity } from '../../../entities/channel/user-channels.entity'


export interface IGetUserChannelsDataGateway {
  getUserChannels: (page?: number) => Promise<any>
}

export interface IGetUserChannelsDataRepository {
  initializeUserChannels: (channels: IPagedChannelEntity) => void
  appendUserChannels: (channels: IPagedChannelEntity) => void
}

export default class GetUserChannelsUseCase {
  constructor(
    private readonly dataGateway: IGetUserChannelsDataGateway,
    private readonly dataRepository: IGetUserChannelsDataRepository,
  ) {
  }
  async execute(iniitalizeList: boolean = false, page?: number) {
    try {
      const userChannels = await this.dataGateway.getUserChannels(page)
      if (iniitalizeList) {
        await this.dataRepository.appendUserChannels(userChannels)
      } else {
        await this.dataRepository.initializeUserChannels(userChannels)
      }
    } catch (error: any) {
      throw error
    }
  }
}