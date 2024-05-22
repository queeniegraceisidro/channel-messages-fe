import {
   IChannelModel, IPagedAPIViewModel, IUserChannelModel,
} from '../api.types'
import ChannelEntity, { IChannel, IChannelCreateForm } from '../../../../domain/entities/channel/channel.entity'
import { Api } from '../../../infra/api.base'
import { mapChannelAttributes, mapChannelErrorAttributes, mapUserChannelsAttributes } from './mappers/channel.mappers'
import { CHANNEL_URL, USER_CHANNEL_URL, } from '../constants'
import PagedChannelEntity, { IPagedChannelEntity } from '../../../../domain/entities/channel/user-channels.entity'
import { BadRequest } from '../../../infra/api.error'
import { FormRequestError } from '../../../../domain/entities/formModels/errors.entity'
import { IChannelErrorModel } from '../api-error.types'
import { IFormChannelError } from '../../../../domain/entities/formModels/signup-form.entity'

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
}
