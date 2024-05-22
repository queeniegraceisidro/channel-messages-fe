import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IChannel } from "../../../../domain/entities/channel/channel.entity";

interface IChannelState {
  channels: IChannel[],
  currentChannel: IChannel | undefined
}

const initialState: IChannelState = {
  channels: [],
  currentChannel: undefined
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
    }
  },
})

// Action creators are generated for each case reducer function
export const {
  addNewChannel,
  initializeUserChannels,
  setCurrentChannel,
  clearCurrentChannel
} = channelSlice.actions
export default channelSlice.reducer