import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import { IChannel } from '../../../../../domain/entities/channel/channel.entity';

export interface ISidebarViewModel {
  onToggleSidebar: () => void
  sidebarOpen: boolean
  channels: IChannel[]
  currentPage: string
  handleRedirectToDashboard: () => void
  handleRedirectToChannel: (element: IChannel) => void
  currentChannelId: number | undefined
}

const drawerWidth: number = 240;

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);


export const SidebarView: React.FC<ISidebarViewModel> = (props) => {

  return (
    <Drawer variant="permanent" open={props.sidebarOpen}>
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          px: [1],
        }}
      >
        <IconButton onClick={props.onToggleSidebar}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List component="nav">
        <ListItemButton
          key={'dashboard'}
          sx={{
            backgroundColor: props.currentPage === 'dashboard' ? '#21958c33' : 'inherit',
          }}
          onClick={props.handleRedirectToDashboard}
        >
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
        <Divider sx={{ my: 1 }} />
        <ListSubheader component="div" inset>
          Joined Channels
        </ListSubheader>
        {
          props.channels.map((element) => {
            return <ListItemButton
              key={element.id}
              sx={{
                backgroundColor: props.currentChannelId === element.id ? '#21958c33' : 'inherit',
              }}
              onClick={() => props.handleRedirectToChannel(element)}
            >
              <ListItemIcon>
                <QuestionAnswerIcon />
              </ListItemIcon>
              <ListItemText primary={element.name} />
            </ListItemButton>
          })
        }
      </List>
    </Drawer>
  )
}