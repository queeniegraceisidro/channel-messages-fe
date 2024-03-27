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


interface ICreateChannelModalViewModel {
  children: React.ReactNode
  show: boolean
  handleClose: () => void
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

const CreateChannelModalView: React.FC<ICreateChannelModalViewModel> = (props) => {
  return (
    <Modal
      aria-labelledby="create-channel"
      aria-describedby="create-channel-modal-description"
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
          <Typography id="create-channel" variant="h6" component="h2">
            Create Channel
          </Typography>
          <Typography id="create-channel-modal-description" sx={{ mt: 2 }}>
            Select a channel name and invite other people to your channel to start conversing
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
              Create
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  )
}

export default CreateChannelModalView