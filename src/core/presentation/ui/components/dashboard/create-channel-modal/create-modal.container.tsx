import React from 'react'
import CreateChannelModalView from './create-model.view'


interface ICreateChannelModalContainerViewModel {
  children?: React.ReactNode
  show: boolean
  handleClose: () => void
}

export const CreateChannelModal: React.FC<ICreateChannelModalContainerViewModel> = (props) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const data = new FormData(event.currentTarget);
  };

  return <CreateChannelModalView
    children={props.children}
    show={props.show}
    handleClose={props.handleClose}
    handleSubmit={handleSubmit}
  />
}