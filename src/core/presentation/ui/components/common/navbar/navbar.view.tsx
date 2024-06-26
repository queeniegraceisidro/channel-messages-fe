import { styled } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import Zoom from '@mui/material/Zoom';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

export interface INavbarViewModel {
  onToggleSidebar: () => void
  sidebarOpen: boolean
  handleLogout: () => void
  currentPage: string
  inviteCode?: string
  handleCopyInviteCode: (inviteCode: string) => void
  tooltipText: string
}

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export const NavbarView: React.FC<INavbarViewModel> = (props) => {
  return (
    <AppBar position="absolute" open={props.sidebarOpen}>
      <Toolbar
        sx={{
          pr: '24px',
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={props.onToggleSidebar}
          sx={{
            marginRight: '36px',
            ...(props.sidebarOpen && { display: 'none' }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1 }}
        >
          {props.currentPage}
        </Typography>
        {props.inviteCode ?
          <Tooltip TransitionComponent={Zoom} title={props.tooltipText}>
            <Button onClick={() => props.handleCopyInviteCode(props.inviteCode!)} startIcon={<ContentCopyIcon />} sx={{ mr: 2, color: 'white' }}>
              {`Invite Code - ${props.inviteCode}`}
            </Button>
          </Tooltip>
          : null}

        {props.inviteCode === undefined ? <IconButton color="inherit" onClick={props.handleLogout}>
          <LogoutIcon />
        </IconButton> : ''}
      </Toolbar>
    </AppBar>
  )
}