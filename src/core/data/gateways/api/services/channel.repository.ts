import { IChannel } from "../../../../domain/entities/channel/channel.entity"
import { addNewChannel, initializeUserChannels } from "../../../../presentation/presenters/store/reducers/channels.reducer"
import { store } from "../../../../presentation/presenters/store/store"

export default class ChannelRepository {
  setChannel(channel: IChannel) {
    store.dispatch(addNewChannel(channel))
  }

  initializeUserChannels(channels: IChannel[]) {
    store.dispatch(initializeUserChannels(channels))
  }
}