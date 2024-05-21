import * as React from 'react';
import { Modal, Fade, Box, Backdrop, TextField, Button, Typography } from '@mui/material';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


interface IJoinChannelModalViewModel {
  children: React.ReactNode
  show: boolean
  handleClose: () => void
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

const JoinChannelModalView: React.FC<IJoinChannelModalViewModel> = (props) => {
  return (
    <Modal
      aria-labelledby="join-channel"
      aria-describedby="join-channel-modal-description"
      open={props.show}
      onClose={props.handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={props.show}>
        <Box sx={style}>
          <Typography id="join-channel" variant="h6" component="h2">
            Join Channel
          </Typography>
          <Typography id="join-channel-modal-description" sx={{ mt: 2 }}>
            Enter a channel name to join an existing conversation
          </Typography>

          <Box component="form" onSubmit={props.handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="channel"
              label="Channel Name"
              name="channel"
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Join
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  )
}

export default JoinChannelModalView