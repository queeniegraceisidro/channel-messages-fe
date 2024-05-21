import React from 'react'
import ChannelView from './channel.view';

export interface IChannelContainerViewModel {
  children?: React.ReactNode
}

export const ChannelContainer: React.FC<IChannelContainerViewModel> = (props) => {
  let channelName = 'General' // The channel name to be passed from params
  return <ChannelView
    children={props.children}
    channelName={channelName}
  />
}