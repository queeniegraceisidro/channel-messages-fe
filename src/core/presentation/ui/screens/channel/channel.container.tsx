import ChannelView from './channel.view';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import ChannelController from './channel.controller';
import { useAppSelector } from '../../../presenters/store/hooks';
import { useEffect } from 'react';

export interface IChannelContainerViewModel {
  children?: React.ReactNode
}

export const ChannelContainer: React.FC<IChannelContainerViewModel> = (props) => {
  const selectedChannel = useAppSelector(state => state.channelState.currentChannel);
  const { channelId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new ChannelController();
    if (selectedChannel === undefined || (selectedChannel && selectedChannel.id !== (channelId !== undefined ? parseInt(channelId) : 0))) {
      controller.removeCurrentChannel();
      toast.error('Invalid Channel!');
      navigate('/dashboard');
    }
    // eslint-disable-next-line
  }, []);

  return <ChannelView
    children={props.children}
    channelName={selectedChannel}
  />
}