import PagedListEntity from '../base/base.paged.entity'
import { IMessage } from './message.entity'


export interface IPagedMessageEntity {
  results: IMessage[]
  next: string | null
  previous: string | null
  totalPages: number
  count: number,
  currentPageNumber: number
}

export default class PagedMessageEntity extends PagedListEntity<IMessage> {

  constructor(model: IPagedMessageEntity | null = null) {
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

  getCurrentValuesAsJSON(): IPagedMessageEntity {
    return Object.assign({}, this);
  }
}