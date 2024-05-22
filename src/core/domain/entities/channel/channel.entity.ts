import { IBaseDataModelEntity } from '../base/base.entity'

export interface IChannel {
  id: number
  name: string
  inviteCode: string
  createdAt: string
  updatedAt?: string
  deletedAt?: string
}

export interface IChannelCreateForm {
  name: string
}

export default class ChannelEntity implements IBaseDataModelEntity {
  id: number;
  name: string;
  inviteCode: string;
  createdAt: string;
  updatedAt?: string;
  deletedAt?: string;

  constructor(model: IChannel) {
    this.id = model.id;
    this.name = model.name;
    this.inviteCode = model.inviteCode;
    this.createdAt = model.createdAt;
    this.updatedAt = model.updatedAt ?? undefined;
    this.deletedAt = model.deletedAt ?? undefined;
  }

  getCurrentValuesAsJSON(): IChannel {
    return Object.assign({}, this);
  }

  static mock(name: string = 'Test Channel'): ChannelEntity {
    const channel = new ChannelEntity({
      'id': 1,
      'name': name,
      'inviteCode': '3fDMxYsd',
      'createdAt': '2024-01-27 05:38 PM'
    })
    return channel
  }
}
