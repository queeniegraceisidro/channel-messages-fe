import { useAppSelector } from '../../../../presenters/store/hooks';
import { SidebarView } from './sidebar.view'
import { store } from '../../../../presenters/store/store';
import { clearCurrentChannel, setCurrentChannel } from '../../../../presenters/store/reducers/channels.reducer';
import { useNavigate } from 'react-router-dom';
import { IChannel } from '../../../../../domain/entities/channel/channel.entity';
import { useEffect, useState } from 'react';
import SidebarController from './sidebar.controller';

export interface ISidebarContainerViewModel {
  onToggleSidebar: () => void
  sidebarOpen: boolean
  currentPage: string
}

export const SidebarContainer: React.FC<ISidebarContainerViewModel> = (props) => {
  const controller = new SidebarController()
  const channels = useAppSelector(state => state.channelState.channels);
  const nextPage = useAppSelector(state => state.channelState.nextChannelsPage);
  const currentChannel = useAppSelector(state => state.channelState.currentChannel);
  const [selectedChannelId, setSelectedChannelId] = useState<number | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleRedirectToDashboard = () => {
    navigate('/dashboard');
  }

  const handleRedirectToChannel = (channel: IChannel) => {
    const channelUrl = `/channel/${channel.id}`;
    store.dispatch(setCurrentChannel(channel.id))
    navigate(channelUrl);
  }

  useEffect(() => {
    if (currentChannel) {
      setSelectedChannelId(currentChannel.id);
    } else {
      setSelectedChannelId(undefined);
      store.dispatch(clearCurrentChannel())
    }
  }, [currentChannel])

  const loadChannels = async () => {
    setIsLoading(true);
    if (nextPage != null) {
      await controller.getUserChannels(nextPage)
    }
    setIsLoading(false);
  };

  return <SidebarView
    onToggleSidebar={props.onToggleSidebar}
    sidebarOpen={props.sidebarOpen}
    channels={channels}
    currentChannelId={selectedChannelId}
    currentPage={props.currentPage}
    handleRedirectToDashboard={handleRedirectToDashboard}
    handleRedirectToChannel={handleRedirectToChannel}
    handleLoadChannels={loadChannels}
    isLoading={isLoading}
  />
}