import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IChannel } from "../../../../domain/entities/channel/channel.entity";
import { IMessage } from "../../../../domain/entities/message/message.entity";
import { IPagedMessageEntityWithCursors } from "../../../../domain/entities/message/channel-messages.entity";
import { IPagedChannelEntity } from "../../../../domain/entities/channel/user-channels.entity";

interface IChannelState {
  channels: IChannel[],
  currentChannel: IChannel | undefined
  messages: IMessage[]
  nextMessageCursor: string | null
  nextChannelsPage: string | null
}

const initialState: IChannelState = {
  channels: [],
  currentChannel: undefined,
  messages: [],
  nextMessageCursor: null,
  nextChannelsPage: null
}

export const channelSlice = createSlice({
  name: 'channel',
  initialState,
  reducers: {
    addNewChannel(state, action: PayloadAction<IChannel>) {
      const newChannel = action.payload
      state.channels = [newChannel, ...state.channels]
    },
    initializeUserChannels(state, action: PayloadAction<IPagedChannelEntity>) {
      let channels: IChannel[] = []
      action.payload.results.forEach((result: { channel: any }) => {
        channels.push(result.channel)
      });
      state.channels = channels
      state.nextChannelsPage = action.payload.next
    },
    setCurrentChannel(state, action: PayloadAction<number>) {
      state.currentChannel = state.channels.find(channel => channel.id === action.payload);
    },
    clearCurrentChannel(state) {
      state.currentChannel = undefined;
    },
    appendUserChannels(state, action: PayloadAction<IPagedChannelEntity>) {
      let channels: IChannel[] = []
      action.payload.results.forEach((result: { channel: any }) => {
        channels.push(result.channel)
      });
      state.channels = state.channels.concat(channels);
      state.nextChannelsPage = action.payload.next
    },
    setChannelMessages(state, action: PayloadAction<IPagedMessageEntityWithCursors>) {
      state.messages = action.payload.results
      state.nextMessageCursor = action.payload.nextCursor;
    },
    appendChannelMessages(state, action: PayloadAction<IPagedMessageEntityWithCursors>) {
      state.messages = state.messages.concat(action.payload.results);
      state.nextMessageCursor = action.payload.nextCursor;
    },
    addChannelMessage(state, action: PayloadAction<IMessage>) {
      const newMessage = action.payload
      // Check if the pk already exists on the thread to avoid displaying duplicate messages
      const messageExist = state.messages.some((message) => message.id === newMessage.id);
      if (!messageExist) {
        state.messages = [newMessage, ...state.messages]
      }
    }
  },
})

// Action creators are generated for each case reducer function
export const {
  addNewChannel,
  initializeUserChannels,
  appendUserChannels,
  setCurrentChannel,
  clearCurrentChannel,
  setChannelMessages,
  addChannelMessage,
  appendChannelMessages
} = channelSlice.actions
export default channelSlice.reducer