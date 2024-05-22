import {
  IChannelModel, IMessageModel, IPagedAPIViewModel, IUserChannelModel,
} from '../api.types'
import ChannelEntity, { IChannel, IChannelCreateForm } from '../../../../domain/entities/channel/channel.entity'
import { Api } from '../../../infra/api.base'
import { mapChannelAttributes, mapChannelErrorAttributes, mapUserChannelsAttributes } from './mappers/channel.mappers'
import { CHANNEL_JOIN_URL, CHANNEL_URL, USER_CHANNEL_URL, } from '../constants'
import PagedChannelEntity, { IPagedChannelEntity } from '../../../../domain/entities/channel/user-channels.entity'
import { BadRequest } from '../../../infra/api.error'
import { FormRequestError } from '../../../../domain/entities/formModels/errors.entity'
import { IChannelErrorModel } from '../api-error.types'
import { IFormChannelError, IFormJoinChannel } from '../../../../domain/entities/formModels/signup-form.entity'
import PagedMessageEntity, { IPagedMessageEntity } from '../../../../domain/entities/message/channel-messages.entity'
import { mapChannelMessagesAttributes } from './mappers/messages.mappers'

export default class ChannelApiGateway extends Api {

  async createChannel(channelName: string): Promise<IChannel> {
    try {
      const res = await this._createChannel(channelName)
      return this._mapChannelFromResponse(res)
    } catch (error) {
      if (error instanceof BadRequest) {
        const errorData = this._mapErrorDataFromResponse(error.data)
        throw new FormRequestError(error.message, errorData)
      }
      throw error
    }
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

  private _mapErrorDataFromResponse(response: IChannelErrorModel): IFormChannelError {
    return mapChannelErrorAttributes(response)
  }

  async joinChannel(inviteCodeParams: IFormJoinChannel): Promise<IChannel> {
    try {
      const res = await this._joinChannel(inviteCodeParams)
      return this._mapChannelFromResponse(res)
    } catch (error) {
      if (error instanceof BadRequest) {
        const errorData = this._mapErrorDataFromResponse(error.data)
        throw new FormRequestError(error.message, errorData)
      }
      throw error
    }
  }

  private async _joinChannel(inviteCodeParams: IFormJoinChannel): Promise<IChannelModel> {
    return await this.post<IChannelModel>(CHANNEL_JOIN_URL, inviteCodeParams)
  }

  async getChannelMessages(id: number): Promise<IPagedMessageEntity> {
    try {
      const response = await this._getChannelMessages(id)
      return this._mapChannelMessagesFromResponse(response)
    } catch (error) {
      throw error
    }
  }

  private async _getChannelMessages(id: number): Promise<IPagedAPIViewModel<IMessageModel>> {
    return await this.get(`${CHANNEL_URL}${id}/messages/`)
  }

  private _mapChannelMessagesFromResponse(response: IPagedAPIViewModel<IMessageModel>): IPagedMessageEntity {
    const messages = new PagedMessageEntity(mapChannelMessagesAttributes(response))
    return messages.getCurrentValuesAsJSON()
  }

}
