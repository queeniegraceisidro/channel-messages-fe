import { IPagedMessageEntityWithCursors } from "../../../entities/message/channel-messages.entity"

export interface IRetrieveChannelMessagesDataGateway {
  getChannelMessages: (id: number, cursor: string | null) => Promise<any>
}

export interface IRetrieveChannelMessagesDataRepository {
  setChannelMessages: (messages: IPagedMessageEntityWithCursors) => void
  appendChannelMessages: (messages: IPagedMessageEntityWithCursors) => void
}

export default class RetrieveChannelMessagesUseCase {
  constructor(
    private readonly dataGateway: IRetrieveChannelMessagesDataGateway,
    private readonly dataRepository: IRetrieveChannelMessagesDataRepository,
  ) {
  }

  async execute(channelId: number, cursor: string | null) {
    try {
      const messages = await this.dataGateway.getChannelMessages(channelId, cursor);
      // TODO: Maybe separate this?
      if (cursor == null) {
        this.dataRepository.setChannelMessages(messages);
      } else {
        this.dataRepository.appendChannelMessages(messages)
      }
    } catch (error) {
      throw error;
    }
  }

}