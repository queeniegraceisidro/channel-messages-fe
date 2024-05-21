import { Avatar, Box, Button, Container, CssBaseline, Grid, Link, TextField, ThemeProvider, Typography } from '@mui/material';
import * as React from 'react';
import { defaultTheme } from '../../components/common/theme/app-theme.styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

export interface ILoginViewModel {
  children: React.ReactNode
}

const LoginView: React.FC<ILoginViewModel> = (props) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const data = new FormData(event.currentTarget);
  };

  return (
    <ThemeProvider theme={defaultTheme}>

      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? '#e0f2f1'
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <CssBaseline />
        <Container
          maxWidth="sm"
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#fafafa',
            padding: 10,
            borderRadius: 5,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h4">
            Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Container>

      </Box>



    </ThemeProvider>
  );
}

export default LoginView