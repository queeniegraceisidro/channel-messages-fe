import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IChannel } from "../../../../domain/entities/channel/channel.entity";

interface IChannelState {
  channels: IChannel[],
}

const initialState: IChannelState = {
  channels: [],
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
  },
})

// Action creators are generated for each case reducer function
export const {
  addNewChannel,
  initializeUserChannels
} = channelSlice.actions
export default channelSlice.reducer