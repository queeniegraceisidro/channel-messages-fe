import { IBaseDataModelEntity } from '../base/base.entity'
import { IUser } from '../user/user.entity'

export interface IMessage {
  id: number
  channel: number
  sender: IUser
  message: string
  createdAt?: string
}

export default class MessageEntity implements IBaseDataModelEntity {
  id: number;
  channel: number;
  sender: IUser;
  message: string;
  createdAt?: string;

  constructor(model: IMessage) {
    this.id = model.id;
    this.channel = model.channel;
    this.sender = model.sender;
    this.message = model.message;
    this.createdAt = model.createdAt;
  }

  getCurrentValuesAsJSON(): IMessage {
    return Object.assign({}, this);
  }

  static mock(message: string = 'Hello! Thanks for inviting me'): MessageEntity {
    const channelMessage = new MessageEntity({
      'id': 1,
      'channel': 1,
      'message': message,
      'sender': {
        'id': 1,
        'username': 'JohnDoe23',
        'firstName': 'John',
        'lastName': 'Doe',
      },
      'createdAt': '2024-04-27 05:38 PM'
    })
    return channelMessage
  }
}