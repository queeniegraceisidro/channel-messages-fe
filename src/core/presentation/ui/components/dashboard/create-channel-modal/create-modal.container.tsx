import CreateChannelModalController from './create-modal.controller'
import CreateChannelModalView from './create-model.view'
import { IFormChannel } from '../../../../../domain/entities/formModels/signup-form.entity'

interface ICreateChannelModalContainerViewModel {
  children?: React.ReactNode
  show: boolean
  handleClose: () => void
}

export const CreateChannelModal: React.FC<ICreateChannelModalContainerViewModel> = (props) => {
  const controller = new CreateChannelModalController()

  const handleSubmit = async (values: IFormChannel) => {
    await controller.createChannel(values)
  };

  return <CreateChannelModalView
    children={props.children}
    show={props.show}
    handleClose={props.handleClose}
    handleSubmit={handleSubmit}
  />
}