import {
  IChannelModel, IPagedAPIViewModel, IUserChannelModel,
} from '../api.types'
import ChannelEntity, {IChannel, IChannelCreateForm } from '../../../../domain/entities/channel/channel.entity'
import { Api } from '../../../infra/api.base'
import { mapChannelAttributes, mapUserChannelsAttributes } from './mappers/channel.mappers'
import { CHANNEL_URL, USER_CHANNEL_URL, } from '../constants'
import PagedChannelEntity, { IPagedChannelEntity } from '../../../../domain/entities/channel/user-channels.entity'

export default class ChannelApiGateway extends Api {

  async createChannel(channelName: string): Promise<IChannel> {
     const res = await this._createChannel(channelName)
     return this._mapChannelFromResponse(res)
  }

  private async _createChannel(channelName: string): Promise<IChannelModel> {
     let params: IChannelCreateForm = {
        name: channelName,
     }
     return await this.post<IChannelModel>(CHANNEL_URL, params)
  }

  private _mapChannelFromResponse(rawChannel: IChannelModel): IChannel {
     const channel = new ChannelEntity(mapChannelAttributes(rawChannel))
     return channel.getCurrentValuesAsJSON()
  }

  async getUserChannels(): Promise<IPagedChannelEntity> {
     try {
        const response = await this._getUserChannels()
        return this._mapUserChannelsFromResponse(response)
     } catch (error) {
        throw error
     }
  }

  private async _getUserChannels(): Promise<IPagedAPIViewModel<IUserChannelModel>> {
     return await this.get(USER_CHANNEL_URL)
  }

  private _mapUserChannelsFromResponse(response: IPagedAPIViewModel<IUserChannelModel>): IPagedChannelEntity {
     const channels = new PagedChannelEntity(mapUserChannelsAttributes(response))
     return channels.getCurrentValuesAsJSON()
  }
}