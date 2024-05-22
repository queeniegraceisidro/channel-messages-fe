import { useEffect, useRef, useState } from 'react';
import { BaseLayoutContainer } from '../../components/common/layouts/base-layout/base-layout.container';
import { Avatar, Divider, Fab, Grid, List, ListItem, Paper, TextField, LinearProgress, Box } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { IChannel } from '../../../../domain/entities/channel/channel.entity';
import { IMessage } from '../../../../domain/entities/message/message.entity';
import { store } from '../../../presenters/store/store';
import { WEBSOCKET_URL } from '../../../../../config';
import { WEBSOCKET_CHANNEL_DETAIL_URL } from '../../../../data/gateways/api/constants';
import { addChannelMessage } from '../../../presenters/store/reducers/channels.reducer';
import { mapMessageAttributes } from '../../../../data/gateways/api/services/mappers/messages.mappers';


export interface IChannelViewModel {
  children: React.ReactNode
  channel: IChannel | undefined
  messages: IMessage[]
  isLoading: boolean
  handleSendMessage: (message: string) => void
  handleLoadMessage: () => void
}

const ChannelView: React.FC<IChannelViewModel> = (props) => {
  const currentUser = store.getState().authState.user
  const [newMessage, setNewMessage] = useState<string>('');
  const messagesStartRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const SOCKET_URL = `${WEBSOCKET_URL}${WEBSOCKET_CHANNEL_DETAIL_URL(props.channel!.id)}`
    const socket = new WebSocket(SOCKET_URL);

    socket.onopen = () => {
      console.log("WebSocket connection established.");
    };

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data).message
      const parsedMessage: IMessage = mapMessageAttributes(message)
      store.dispatch(addChannelMessage(parsedMessage))
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed.");
    };

    return () => {
      socket.close();
    };
  }, [props.channel]);

  useEffect(() => {

    // Scroll to the bottom when messages change
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }

  }, [props.channel, props.messages]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevents a newline from being added to the text area
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return; // Avoid sending empty messages
    props.handleSendMessage(newMessage)
    setNewMessage('')
  };

  const handleScroll = async () => {
    if (containerRef.current) {
      const { scrollTop, clientHeight, scrollHeight } = containerRef.current;
      if (scrollTop === 0 && !props.isLoading) {
        // Save current scroll position
        const prevScrollHeight = scrollHeight;
        await props.handleLoadMessage();
        // Calculate new scroll position
        const newScrollHeight = containerRef.current.scrollHeight;
        const scrollDifference = newScrollHeight - prevScrollHeight;

        // Adjust scroll position to maintain relative position
        containerRef.current.scrollTop = scrollDifference;
      }
    }
  };

  return (
    <>
      {
        props.channel !== undefined ?
          <BaseLayoutContainer currentPage={props.channel.name}>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="stretch"
              sx={{ width: '100%', flexGrow: 1, overflow: 'hidden' }}
            >
              <Grid xs={12} sx={{ width: '100%' }}>
                <Paper ref={containerRef} onScroll={handleScroll} style={{ height: '75vh', overflowY: 'auto' }}>
                  <Box>
                    {
                      props.isLoading ?
                        <LinearProgress />
                        : <LinearProgress variant="buffer" value={100} valueBuffer={100} />
                    }
                    <List style={{ display: 'flex', flexDirection: 'column-reverse' }}>
                      <div ref={messagesStartRef} />
                      {props.messages.map((message) => (
                        <ListItem
                          key={message.id}
                          style={{
                            flexDirection: message.sender.id === currentUser!.id ? 'row-reverse' : 'row',
                            marginBottom: '5px',
                            padding: '8px',
                          }}
                        >
                          <div>
                            {message.sender.id !== currentUser!.id && (
                              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                                <Avatar>{message.sender.firstName.charAt(0)}</Avatar>
                                <div style={{ marginLeft: '10px', color: message.sender.id === currentUser!.id ? '#35bdb1' : '#000' }}>
                                  {message.sender.firstName} {message.sender.lastName}
                                </div>
                              </div>
                            )}
                            <div
                              style={{
                                backgroundColor: message.sender.id === currentUser!.id ? '#35bdb1' : '#f0f0f0',
                                borderRadius: '15px',
                                padding: '10px',
                                display: 'flex',
                                flexDirection: 'column',
                                minWidth: '150px',
                                maxWidth: '300px',
                                overflowWrap: 'break-word',
                              }}
                            >
                              <div style={{ color: message.sender.id === currentUser!.id ? '#fff' : '#000' }}>{message.message}</div>
                            </div>
                          </div>
                        </ListItem>
                      ))}
                    </List>
                  </Box>

                </Paper>
                <Divider />
                <Grid container justifyContent="center" alignItems="center" style={{ padding: '20px' }}>
                  <Grid xs={10} md={11}>
                    <TextField
                      id="outlined-basic-email"
                      label={"Message " + props.channel.name}
                      fullWidth
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={handleKeyDown}
                    />
                  </Grid>
                  <Grid xs={2} md={1} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Fab color="primary" aria-label="add" onClick={handleSendMessage} style={{ height: '50px' }}>
                      <SendIcon />
                    </Fab>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </BaseLayoutContainer> : ""
      }
    </>
  )
}

export default ChannelView