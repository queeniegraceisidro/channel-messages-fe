import PagedListEntity from '../base/base.paged.entity'
import { IChannel } from './channel.entity'


export interface IUserChannel {
  id: number
  channel: IChannel
}

export interface IPagedChannelEntity {
  results: IUserChannel[]
  next: string | null
  previous: string | null
  totalPages: number
  count: number,
  currentPageNumber: number
}


export default class PagedChannelEntity extends PagedListEntity<IUserChannel> {

  constructor(model: IPagedChannelEntity | null = null) {
    super(model);
    if (model !== null) {
      this.results = model.results;
      this.count = model.count;
      this.next = model.next ?? '';
      this.previous = model.previous ?? '';
      this.totalPages = model.totalPages;
      this.currentPageNumber = model.currentPageNumber;
    }
  }

  getCurrentValuesAsJSON(): IPagedChannelEntity {
    return Object.assign({}, this);
  }
}