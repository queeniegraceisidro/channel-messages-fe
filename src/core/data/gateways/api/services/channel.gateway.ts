import {
  IChannelModel,
} from '../api.types'
import ChannelEntity, { IChannel, IChannelCreateForm } from '../../../../domain/entities/channel/channel.entity'
import { Api } from '../../../infra/api.base'
import { mapChannelAttributes } from './mappers/channel.mappers'
import { CHANNEL_URL, } from '../constants'

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
}