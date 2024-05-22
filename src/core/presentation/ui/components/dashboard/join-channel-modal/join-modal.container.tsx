import JoinChannelModalView from './join-modal.view'
import JoinChannelModalController from './join-modal.controller'
import { IFormJoinChannel } from '../../../../../domain/entities/formModels/signup-form.entity'

interface IJoinChannelModalContainerViewModel {
  children?: React.ReactNode
  show: boolean
  handleClose: () => void
}

export const JoinChannelModal: React.FC<IJoinChannelModalContainerViewModel> = (props) => {
  const controller = new JoinChannelModalController()

  const handleSubmit = async (values: IFormJoinChannel) => {
    await controller.joinChannel(values)
  };

  return <JoinChannelModalView
    children={props.children}
    show={props.show}
    handleClose={props.handleClose}
    handleSubmit={handleSubmit}
  />
}