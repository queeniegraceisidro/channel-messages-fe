import { useEffect, useRef, useState } from 'react';
import { BaseLayoutContainer } from '../../components/common/layouts/base-layout/base-layout.container';
import { Avatar, Divider, Fab, Grid, List, ListItem, Paper, TextField, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';


export interface IChannelViewModel {
  children: React.ReactNode
  channelName: string
}

interface Message {
  id: number;
  content: string;
  sender: string;
}


const ChannelView: React.FC<IChannelViewModel> = (props) => {
  const [newMessage, setNewMessage] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  // Sample messages for UI testing
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: 'Hello, how are you?',
      sender: 'John',
    },
    {
      id: 2,
      content: 'Hi John! I\'m doing well, thank you.',
      sender: 'Alice',
    },
    {
      id: 3,
      content: 'Great to hear! Let me know if you need anything.',
      sender: 'John',
    },
  ]);

  useEffect(() => {
    // Scroll to the bottom when messages change
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevents a newline from being added to the text area
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return; // Avoid sending empty messages

    setMessages(prevMessages => [
      ...prevMessages,
      {
        id: prevMessages.length + 1,
        content: newMessage,
        sender: 'You', // Assuming the user is the sender
      },
    ]);
    setNewMessage('');
  };

  return (
    <BaseLayoutContainer currentPage='channel'>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        sx={{ width: '100%', flexGrow: 1, overflow: 'hidden' }}
      >
        <Grid item xs={12} sx={{ padding: '15px', backgroundColor: '#35bdb1', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', padding: '5px' }}>
            <Typography variant="h6">Sample Channel</Typography>
          </div>
        </Grid>
        <Grid item xs={12} sx={{ width: '100%' }}>
          <Paper style={{ height: '68vh', overflowY: 'auto' }}>
            <List>
              {messages.map((message) => (
                <ListItem
                  key={message.id}
                  style={{
                    flexDirection: message.sender === 'You' ? 'row-reverse' : 'row',
                    marginBottom: '5px',
                    padding: '8px',
                  }}
                >
                  <div>
                    {message.sender !== 'You' && (
                      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                        <Avatar>{message.sender.charAt(0)}</Avatar>
                        <div style={{ marginLeft: '10px', color: message.sender === 'You' ? '#35bdb1' : '#000' }}>
                          {message.sender}
                        </div>
                      </div>
                    )}
                    <div
                      style={{
                        backgroundColor: message.sender === 'You' ? '#35bdb1' : '#f0f0f0',
                        borderRadius: '15px',
                        padding: '10px',
                        display: 'flex',
                        flexDirection: 'column',
                        minWidth: '150px',
                        maxWidth: '300px',
                        overflowWrap: 'break-word',
                      }}
                    >
                      <div style={{ color: message.sender === 'You' ? '#fff' : '#000' }}>{message.content}</div>
                    </div>
                  </div>
                </ListItem>
              ))}
              <div ref={messagesEndRef} />
            </List>
          </Paper>
          <Divider />
          <Grid container justifyContent="center" alignItems="center" style={{ padding: '20px' }}>
            <Grid item xs={12} md={10} sx={{ paddingRight: '10px' }}>
              <TextField
                id="outlined-basic-email"
                label={"Message " + props.channelName}
                fullWidth
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </Grid>
            <Grid xs={12} md={1}>
              <Fab color="primary" aria-label="add" onClick={handleSendMessage} style={{ height: '100%' }}>
                <SendIcon />
              </Fab>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </BaseLayoutContainer>
  )
}

export default ChannelView