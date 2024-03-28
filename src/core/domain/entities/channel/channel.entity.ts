import { IBaseDataModelEntity } from '../base/base.entity'
import PagedListEntity from '../base/base.paged.entity'

export interface IChannel {
  id: number
  name: string
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
  createdAt: string;
  updatedAt?: string;
  deletedAt?: string;

  constructor(model: IChannel) {
    this.id = model.id;
    this.name = model.name;
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
      'createdAt': '2024-01-27 05:38 PM'
    })
    return channel
  }
}

export interface IPagedChannel {
  results: IChannel[]
  next: string
  previous: string
  totalPages: number
  count: number,
  currentPageNumber: number
}


export class PagedChannelEntity extends PagedListEntity<IChannel> {

  constructor(model: IPagedChannel | null = null) {
    super(model);
    if (model !== null) {
      this.results = model.results;
    }
  }

  getCurrentValuesAsJSON(): IPagedChannel {
    return Object.assign({}, this);
  }
}