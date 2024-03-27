import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { NavbarContainer } from '../../navbar/navbar.container';
import { SidebarContainer } from '../../sidebar/sidebar.container';

export interface IBaseLayoutViewModel {
  children: React.ReactNode
  onToggleSidebar: () => void
  sidebarOpen: boolean
}

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#30D5C8',
    },
    secondary: {
      main: '#edf2ff',
    },
  },
});


const BaseLayoutView: React.FC<IBaseLayoutViewModel> = (props) => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <NavbarContainer
          onToggleSidebar={props.onToggleSidebar}
          sidebarOpen={props.sidebarOpen} />
        <SidebarContainer
          onToggleSidebar={props.onToggleSidebar}
          sidebarOpen={props.sidebarOpen} />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth={false} sx={{ mt: 4, mb: 4 }}>
            {props.children}
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default BaseLayoutView