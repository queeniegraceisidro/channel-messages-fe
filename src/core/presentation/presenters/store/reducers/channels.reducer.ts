import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IChannel, IPagedChannel, PagedChannelEntity } from "../../../../domain/entities/channel/channel.entity";

interface IChannelState {
  channel: IPagedChannel,
}

const initialState: IChannelState = {
  channel: new PagedChannelEntity().getCurrentValuesAsJSON(),
}

export const channelSlice = createSlice({
  name: 'channel',
  initialState,
  reducers: {
    addNewChannel(state, action: PayloadAction<IChannel>) {
      const newChannel = action.payload
      state.channel.results = [...state.channel.results, newChannel]
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  addNewChannel,
} = channelSlice.actions
export default channelSlice.reducer