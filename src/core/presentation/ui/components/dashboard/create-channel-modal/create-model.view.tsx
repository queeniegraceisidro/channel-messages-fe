import { Modal, Fade, Box, Backdrop, TextField, Button, Typography } from '@mui/material';
import { useFormik } from 'formik';

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

  const formik = useFormik({
    initialValues: {
      channelName: '',
    },
    onSubmit: async (values) => { },
  });

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

          <form onSubmit={formik.handleSubmit} style={{ marginTop: '20px' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="channelName"
              label="Channel Name"
              autoFocus
              name="channelName"
              autoComplete="channelName"
              value={formik.values.channelName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.channelName && Boolean(formik.errors.channelName)}
              helperText={formik.touched.channelName && formik.errors.channelName}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create
            </Button>
          </form>
        </Box>
      </Fade>
    </Modal>
  )
}

export default CreateChannelModalView