import { IChannelModel, IPagedAPIViewModel, IUserChannelModel } from '../../api.types'

export const mapChannelAttributes = (initialModel: IChannelModel) => {
  return {
    id: initialModel.id,
    name: initialModel.name,
    createdAt: initialModel.created_at,
    updatedAt: initialModel.updated_at,
    deletedAt: initialModel.deleted_at,
  }
}

export const mapUserChannelsAttributes = (initialModel: IPagedAPIViewModel<IUserChannelModel>): IPagedChannelEntity => {
  const channelList = initialModel.results.map((result: IUserChannelModel) => ({
     id: result.id,
     channel: mapChannelAttributes(result.channel)
  }));
  return {
     count: initialModel.count,
     next: initialModel.next,
     previous: initialModel.previous,
     results: channelList,
     totalPages: initialModel.total_pages,
     currentPageNumber: initialModel.current_page_number
  }
}