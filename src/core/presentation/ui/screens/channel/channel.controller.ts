import { clearCurrentChannel, setCurrentChannel } from "../../../presenters/store/reducers/channels.reducer";
import { store } from "../../../presenters/store/store";

export default class ChannelController {

  checkIfChannelIsValid(channelId: number | undefined) {
    let state = store.getState()
    const foundChannel = state.channelState.channels.find(channel => channel.id === channelId);
    if (foundChannel) {
      store.dispatch(setCurrentChannel(foundChannel.id))
    }
    return foundChannel || null;
  }

  removeCurrentChannel() {
    store.dispatch(clearCurrentChannel())
  }
}