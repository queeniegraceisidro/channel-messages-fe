import PagedListEntity from '../base/base.paged.entity'
import { IMessage } from './message.entity'


export interface IPagedMessageEntity {
  results: IMessage[]
  next: string | null
  previous: string | null
  totalPages: number
  count: number,
  currentPageNumber: number,
}

export interface IPagedMessageEntityWithCursors {
  results: IMessage[]
  next: string | null
  previous: string | null
  totalPages: number
  count: number,
  currentPageNumber: number,
  nextCursor: string | null,
  previousCursor: string | null
}

export default class PagedMessageEntity extends PagedListEntity<IMessage> {

  nextCursor: string | null = null
  previousCursor: string | null = null

  constructor(model: IPagedMessageEntity | null = null) {
    super(model);
    if (model !== null) {
      this.results = model.results;
      this.count = model.count;
      this.next = model.next ?? '';
      this.previous = model.previous ?? '';
      this.totalPages = model.totalPages;
      this.currentPageNumber = model.currentPageNumber;
      this.nextCursor = this.getNextCursor();
      this.previousCursor = this.getPreviousCursor();
    }
  }

  _getCursor(urlString: string) {
    try {
      if (urlString) {
        const url = new URL(urlString);
        const searchParams = new URLSearchParams(url.search);
        return searchParams.get('cursor');
      }
      return null
    } catch (error) {
      if (!(error instanceof TypeError)) {
        throw error;
      }
      return null;
    }
  }

  getNextCursor(): string | null {
    if (this.next !== null) {
      return this._getCursor(this.next)
    }
    return null
  }

  getPreviousCursor(): string | null {
    if (this.previous !== null) {
      return this._getCursor(this.previous)
    }
    return null
  }

  getCurrentValuesAsJSON(): IPagedMessageEntityWithCursors {
    return Object.assign({}, this);
  }
}