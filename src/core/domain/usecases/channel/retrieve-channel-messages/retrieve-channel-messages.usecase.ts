import { IPagedMessageEntity } from "../../../entities/message/channel-messages.entity"

export interface IRetrieveChannelMessagesDataGateway {
  getChannelMessages: (id: number) => Promise<any>
}

export interface IRetrieveChannelMessagesDataRepository {
  setChannelMessages: (messages: IPagedMessageEntity) => void
}

export default class RetrieveChannelMessagesUseCase {
  constructor(
    private readonly dataGateway: IRetrieveChannelMessagesDataGateway,
    private readonly dataRepository: IRetrieveChannelMessagesDataRepository,
  ) {
  }
  async execute(channelId: number) {
    const messages = await this.dataGateway.getChannelMessages(channelId)
    this.dataRepository.setChannelMessages(messages)
  }
}