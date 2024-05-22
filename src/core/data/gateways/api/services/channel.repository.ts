import { IChannel } from "../../../../domain/entities/channel/channel.entity"
import { IPagedMessageEntityWithCursors } from "../../../../domain/entities/message/channel-messages.entity"
import { IMessage } from "../../../../domain/entities/message/message.entity"
import { addNewChannel, addChannelMessage, initializeUserChannels, setChannelMessages, appendChannelMessages } from "../../../../presentation/presenters/store/reducers/channels.reducer"
import { store } from "../../../../presentation/presenters/store/store"

export default class ChannelRepository {
  setChannel(channel: IChannel) {
    store.dispatch(addNewChannel(channel))
  }

  initializeUserChannels(channels: IChannel[]) {
    store.dispatch(initializeUserChannels(channels))
  }

  setChannelMessages(messages: IPagedMessageEntityWithCursors) {
    store.dispatch(setChannelMessages(messages))
  }

  appendChannelMessages(messages: IPagedMessageEntityWithCursors) {
    store.dispatch(appendChannelMessages(messages))
  }

  createChannelMessage(message: IMessage) {
    store.dispatch((addChannelMessage(message)))
  }
}