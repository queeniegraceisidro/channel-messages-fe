import {
  IChannelModel,
} from '../../api.types'

export const mapChannelAttributes = (initialModel: IChannelModel) => {
  return {
    id: initialModel.id,
    name: initialModel.name,
    createdAt: initialModel.created_at,
    updatedAt: initialModel.updated_at,
    deletedAt: initialModel.deleted_at,
  }
}