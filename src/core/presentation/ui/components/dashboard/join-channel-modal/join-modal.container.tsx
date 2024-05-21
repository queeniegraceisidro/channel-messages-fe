import React from 'react'
import JoinChannelModalView from './join-modal.view'
import JoinChannelModalController from './join-modal.controller'

interface IJoinChannelModalContainerViewModel {
  children?: React.ReactNode
  show: boolean
  handleClose: () => void
}

export const JoinChannelModal: React.FC<IJoinChannelModalContainerViewModel> = (props) => {
  const controller = new JoinChannelModalController()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => { };

  return <JoinChannelModalView
    children={props.children}
    show={props.show}
    handleClose={props.handleClose}
    handleSubmit={handleSubmit}
  />
}