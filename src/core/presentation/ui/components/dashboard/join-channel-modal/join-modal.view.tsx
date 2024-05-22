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


interface IJoinChannelModalViewModel {
  children: React.ReactNode
  show: boolean
  handleClose: () => void
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

const JoinChannelModalView: React.FC<IJoinChannelModalViewModel> = (props) => {

  const formik = useFormik({
    initialValues: {
      inviteCode: '',
    },
    onSubmit: async (values) => { },
  });

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
            Enter an invite code to join an existing conversation
          </Typography>

          <form onSubmit={formik.handleSubmit} style={{ marginTop: '20px' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="inviteCode"
              label="Invite Code"
              name="inviteCode"
              autoComplete="inviteCode"
              value={formik.values.inviteCode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.inviteCode && Boolean(formik.errors.inviteCode)}
              helperText={formik.touched.inviteCode && formik.errors.inviteCode}
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
          </form>
        </Box>
      </Fade>
    </Modal>
  )
}

export default JoinChannelModalView