import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IChannel } from "../../../../domain/entities/channel/channel.entity";
import { IMessage } from "../../../../domain/entities/message/message.entity";
import { IPagedMessageEntity } from "../../../../domain/entities/message/channel-messages.entity";

interface IChannelState {
  channels: IChannel[],
  currentChannel: IChannel | undefined
  messages: IMessage[]
  hasNextMessagePage: boolean
}

const initialState: IChannelState = {
  channels: [],
  currentChannel: undefined,
  messages: [],
  hasNextMessagePage: false
}

export const channelSlice = createSlice({
  name: 'channel',
  initialState,
  reducers: {
    addNewChannel(state, action: PayloadAction<IChannel>) {
      const newChannel = action.payload
      state.channels = [...state.channels, newChannel]
    },
    initializeUserChannels(state, action: PayloadAction<IChannel[]>) {
      state.channels = action.payload
    },
    setCurrentChannel(state, action: PayloadAction<number>) {
      state.currentChannel = state.channels.find(channel => channel.id === action.payload);
    },
    clearCurrentChannel(state) {
      state.currentChannel = undefined;
    },
    setChannelMessages(state, action: PayloadAction<IPagedMessageEntity>) {
      state.messages = action.payload.results
      state.hasNextMessagePage = action.payload.next ? true : false
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
  setCurrentChannel,
  clearCurrentChannel,
  setChannelMessages,
  addChannelMessage
} = channelSlice.actions
export default channelSlice.reducer