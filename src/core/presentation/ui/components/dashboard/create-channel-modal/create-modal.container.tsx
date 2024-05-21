import CreateChannelModalController from './create-modal.controller'
import CreateChannelModalView from './create-model.view'

interface ICreateChannelModalContainerViewModel {
  children?: React.ReactNode
  show: boolean
  handleClose: () => void
}

export const CreateChannelModal: React.FC<ICreateChannelModalContainerViewModel> = (props) => {
  const controller = new CreateChannelModalController()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    controller.createKnowledgebase(new FormData(event.currentTarget))
  };

  return <CreateChannelModalView
    children={props.children}
    show={props.show}
    handleClose={props.handleClose}
    handleSubmit={handleSubmit}
  />
}