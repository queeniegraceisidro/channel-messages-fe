import { BaseLayoutContainer } from '../../components/common/layouts/base-layout/base-layout.container';
import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import joinChannelImage from '../../../media/join-channel.jpg'
import createChannelImage from '../../../media/create-channel.jpg'
import { CreateChannelModal } from '../../components/dashboard/create-channel-modal/create-modal.container';

export interface IDashboardViewModel {
  children?: React.ReactNode
  showModal: boolean
  handleCreateModalShow: () => void
  handleCreateModalClose: () => void
}

const DashboardView: React.FC<IDashboardViewModel> = (props) => {
  return (
    <BaseLayoutContainer>
      <Grid container spacing={4} sx={{ display: 'flex', flexDirection: 'row', justifyContent: "center" }}>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ maxWidth: 345, display: 'flex', flexDirection: 'column' }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="200"
                image={joinChannelImage}
                alt="Join Channel"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Join Channel
                </Typography>
                <Typography gutterBottom variant="body2" color="text.secondary">
                  Join an existing channel by proving an invite code of the channel that you want to join                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ maxWidth: 345, display: 'flex', flexDirection: 'column' }} onClick={props.handleCreateModalShow}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="200"
                image={createChannelImage}
                alt="Create Channel"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Create Channel
                </Typography>
                <Typography gutterBottom variant="body2" color="text.secondary">
                  Create a channel and invite other people to your channel to start conversing
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
      <CreateChannelModal show={props.showModal} handleClose={props.handleCreateModalClose} />
    </BaseLayoutContainer >
  )
}

export default DashboardView