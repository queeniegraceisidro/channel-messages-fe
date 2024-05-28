import ChannelView from './channel.view';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import ChannelController from './channel.controller';
import { useAppSelector } from '../../../presenters/store/hooks';
import { useEffect, useState } from 'react';

export interface IChannelContainerViewModel {
  children?: React.ReactNode
}

export const ChannelContainer: React.FC<IChannelContainerViewModel> = (props) => {
  const controller = new ChannelController()
  const selectedChannel = useAppSelector(state => state.channelState.currentChannel);
  const messages = useAppSelector(state => state.channelState.messages);
  const nextCursor = useAppSelector(state => state.channelState.nextMessageCursor);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { channelId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedChannel === undefined || (selectedChannel && selectedChannel.id !== (channelId !== undefined ? parseInt(channelId) : 0))) {
      controller.removeCurrentChannel();
      toast.error('Invalid Channel!');
      navigate('/dashboard');
    }
    controller.retrieveChannelMessages(channelId !== undefined ? parseInt(channelId) : undefined)    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    controller.retrieveChannelMessages(channelId !== undefined ? parseInt(channelId) : undefined)
  }, [channelId]);

  const handleSendMessage = async (message: string) => {
    await controller.createChannelMessage(selectedChannel?.id, message)
  };

  const loadMessages = async () => {
    setIsLoading(true);
    if (selectedChannel !== undefined && nextCursor != null) {
      await controller.retrieveChannelMessages(selectedChannel.id, nextCursor)
    }
    setIsLoading(false);
  };

  return <ChannelView
    children={props.children}
    channel={selectedChannel}
    messages={messages}
    handleSendMessage={handleSendMessage}
    handleLoadMessage={loadMessages}
    isLoading={isLoading}
  />
}