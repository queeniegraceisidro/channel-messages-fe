import ChannelApiGateway from "../../../../data/gateways/api/services/channel.gateway";
import ChannelRepository from "../../../../data/gateways/api/services/channel.repository";
import { IFormCreateMessage } from "../../../../domain/entities/formModels/signup-form.entity";
import CreateChannelMessageUseCase from "../../../../domain/usecases/channel/create-channel-messages/create-message.usecase";
import RetrieveChannelMessagesUseCase from "../../../../domain/usecases/channel/retrieve-channel-messages/retrieve-channel-messages.usecase";
import { clearCurrentChannel, setCurrentChannel } from "../../../presenters/store/reducers/channels.reducer";
import { store } from "../../../presenters/store/store";

export default class ChannelController {

  private readonly retrieveChannelMessagesUseCase: RetrieveChannelMessagesUseCase
  private readonly createChannelMessageUseCase: CreateChannelMessageUseCase

  constructor() {
    this.retrieveChannelMessagesUseCase = new RetrieveChannelMessagesUseCase(
      new ChannelApiGateway(),
      new ChannelRepository()
    )
    this.createChannelMessageUseCase = new CreateChannelMessageUseCase(
      new ChannelApiGateway(),
      new ChannelRepository()
    )
  }

  checkIfChannelIsValid(channelId: number | undefined) {
    let state = store.getState()
    const foundChannel = state.channelState.channels.find(channel => channel.id === channelId);
    if (foundChannel) {
      store.dispatch(setCurrentChannel(foundChannel.id))
    }
    return foundChannel || null;
  }

  async retrieveChannelMessages(channelId: number | undefined) {
    if (channelId) {
      await this.retrieveChannelMessagesUseCase.execute(channelId)
    }
  }

  removeCurrentChannel() {
    store.dispatch(clearCurrentChannel())
  }

  async createChannelMessage(channelId: number | undefined, message: string) {
    if (channelId) {
      const messageData: IFormCreateMessage = {
        channel: channelId,
        message: message
      }
      await this.createChannelMessageUseCase.execute(messageData)
    }
  }
}