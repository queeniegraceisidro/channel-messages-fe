import { useAppSelector } from '../../../../presenters/store/hooks';
import { SidebarView } from './sidebar.view'
import { store } from '../../../../presenters/store/store';
import { clearCurrentChannel, setCurrentChannel } from '../../../../presenters/store/reducers/channels.reducer';
import { useNavigate } from 'react-router-dom';
import { IChannel } from '../../../../../domain/entities/channel/channel.entity';
import { useEffect, useState } from 'react';

export interface ISidebarContainerViewModel {
  onToggleSidebar: () => void
  sidebarOpen: boolean
  currentPage: string
}

export const SidebarContainer: React.FC<ISidebarContainerViewModel> = (props) => {
  const channels = useAppSelector(state => state.channelState.channels);
  const currentChannel = useAppSelector(state => state.channelState.currentChannel);
  const navigate = useNavigate();
  const [selectedChannelId, setSelectedChannelId] = useState(0);

  const handleRedirectToDashboard = () => {
    navigate('/dashboard');
    store.dispatch(clearCurrentChannel())
  }

  const handleRedirectToChannel = (channel: IChannel) => {
    const channelUrl = `/channel/${channel.id}`;
    store.dispatch(setCurrentChannel(channel.id))
    navigate(channelUrl);
  }

  useEffect(() => {
    if (currentChannel) {
      setSelectedChannelId(currentChannel.id);
    }
  }, [currentChannel])

  return <SidebarView
    onToggleSidebar={props.onToggleSidebar}
    sidebarOpen={props.sidebarOpen}
    channels={channels}
    currentChannelId={selectedChannelId}
    currentPage={props.currentPage}
    handleRedirectToDashboard={handleRedirectToDashboard}
    handleRedirectToChannel={handleRedirectToChannel}
  />
}