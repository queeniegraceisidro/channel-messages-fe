import { IPagedMessageEntity } from '../../../../../domain/entities/message/channel-messages.entity';
import { IMessageModel, IPagedAPIViewModel } from '../../api.types'
import { mapUserAttributes } from './user.mappers';

export const mapMessageAttributes = (initialModel: IMessageModel) => {
  return {
    id: initialModel.id,
    channel: initialModel.channel,
    sender: mapUserAttributes(initialModel.sender),
    message: initialModel.message,
    createdAt: initialModel.created_at,
  }
}

export const mapChannelMessagesAttributes = (initialModel: IPagedAPIViewModel<IMessageModel>): IPagedMessageEntity => {
  const messagesList = initialModel.results.map((result: IMessageModel) => (mapMessageAttributes(result)));
  return {
    count: initialModel.count,
    next: initialModel.next,
    previous: initialModel.previous,
    results: messagesList,
    totalPages: initialModel.total_pages,
    currentPageNumber: initialModel.current_page_number
  }
}