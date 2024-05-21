import { Avatar, Box, Button, Container, CssBaseline, Grid, Link, TextField, ThemeProvider, Typography } from '@mui/material';
import { defaultTheme } from '../../components/common/theme/app-theme.styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useFormik } from 'formik';


export interface ILoginViewModel {
   children: React.ReactNode
}

const LoginView: React.FC<ILoginViewModel> = (props) => {
   const formik = useFormik({
      initialValues: {
         username: '',
         password: ''
      },
      onSubmit: async (values) => {},
   });

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

               <form onSubmit={formik.handleSubmit} style={{ marginTop: '10px' }}>
                  <Grid container spacing={2}>
                     <Grid item xs={12}>
                        <TextField
                           required
                           fullWidth
                           id="username"
                           label="Username"
                           name="username"
                           autoComplete="username"
                           value={formik.values.username}
                           onChange={formik.handleChange}
                           onBlur={formik.handleBlur}
                           error={formik.touched.username && Boolean(formik.errors.username)}
                           helperText={formik.touched.username && formik.errors.username}
                        />
                     </Grid>
                     <Grid item xs={12}>
                        <TextField
                           required
                           fullWidth
                           name="password"
                           label="Password"
                           type="password"
                           id="password"
                           autoComplete="new-password"
                           value={formik.values.password}
                           onChange={formik.handleChange}
                           onBlur={formik.handleBlur}
                           error={formik.touched.password && Boolean(formik.errors.password)}
                           helperText={formik.touched.password && formik.errors.password}
                        />
                     </Grid>
                  </Grid>
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
                        <Link href="/signup" variant="body2">
                           {"Don't have an account? Sign Up"}
                        </Link>
                     </Grid>
                  </Grid>
               </form>

            </Container>
         </Box>
      </ThemeProvider >
   );
}

export default LoginView