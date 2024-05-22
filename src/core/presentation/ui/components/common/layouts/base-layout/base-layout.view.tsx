import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { NavbarContainer } from '../../navbar/navbar.container';
import { SidebarContainer } from '../../sidebar/sidebar.container';
import { defaultTheme } from '../../theme/app-theme.styles';


export interface IBaseLayoutViewModel {
  children: React.ReactNode
  onToggleSidebar: () => void
  sidebarOpen: boolean
  currentPage: string
}


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
          sidebarOpen={props.sidebarOpen}
          currentPage={props.currentPage}
        />
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