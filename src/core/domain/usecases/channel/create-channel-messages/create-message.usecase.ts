import { IFormCreateMessage } from "../../../entities/formModels/signup-form.entity";
import { IMessage } from "../../../entities/message/message.entity";

export interface ICreateChannelMesageDataGateway {
  createChannelMessage: (messageData: IFormCreateMessage) => Promise<any>
}

export interface ICreateChannelMessageDataRepository {
  createChannelMessage: (message: IMessage) => void
}

export default class CreateChannelMessageUse {
  constructor(
    private readonly dataGateway: ICreateChannelMesageDataGateway,
    private readonly dataRepository: ICreateChannelMessageDataRepository
  ) {

  }

  async execute(messageData: IFormCreateMessage) {
    const message = await this.dataGateway.createChannelMessage(messageData)
    this.dataRepository.createChannelMessage(message)
  }
}