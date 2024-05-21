import { useFormik } from 'formik';
import { Avatar, Box, Button, Container, CssBaseline, Grid, Link, TextField, ThemeProvider, Typography } from '@mui/material';
import { defaultTheme } from '../../components/common/theme/app-theme.styles';
import { IFormSignUp } from '../../../../domain/entities/formModels/signup-form.entity';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { FormRequestError } from '../../../../domain/entities/formModels/errors.entity';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


export interface ISignupViewModel {
   children: React.ReactNode
   handleSubmit: (values: IFormSignUp) => void
}

const SignupView: React.FC<ISignupViewModel> = (props) => {
   const navigate = useNavigate();

   const formik = useFormik({
      initialValues: {
         firstName: '',
         lastName: '',
         username: '',
         password1: '',
         password2: ''
      },
      onSubmit: async (values) => {
         try {
            await props.handleSubmit(values)
            toast.success('Successfully Registered!')
            navigate('/login');
            
         } catch (error) {
            if (error instanceof FormRequestError) {
               formik.setErrors(error.data);
            } else {
               throw Error("Uncaught exception while creating user")
            }
         }
      },
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
                  Signup
               </Typography>
               <form onSubmit={formik.handleSubmit} style={{ marginTop: '10px' }}>
                  <Grid container spacing={2}>
                     <Grid item xs={12} sm={6}>
                        <TextField
                           autoComplete="given-name"
                           name="firstName"
                           required
                           fullWidth
                           id="firstName"
                           label="First Name"
                           autoFocus
                           value={formik.values.firstName}
                           onChange={formik.handleChange}
                           onBlur={formik.handleBlur}
                           error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                           helperText={formik.touched.firstName && formik.errors.firstName}
                        />
                     </Grid>
                     <Grid item xs={12} sm={6}>
                        <TextField
                           required
                           fullWidth
                           id="lastName"
                           label="Last Name"
                           name="lastName"
                           autoComplete="family-name"
                           value={formik.values.lastName}
                           onChange={formik.handleChange}
                           onBlur={formik.handleBlur}
                           error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                           helperText={formik.touched.lastName && formik.errors.lastName}
                        />
                     </Grid>
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
                           name="password1"
                           label="Password"
                           type="password"
                           id="password1"
                           autoComplete="new-password"
                           value={formik.values.password1}
                           onChange={formik.handleChange}
                           onBlur={formik.handleBlur}
                           error={formik.touched.password1 && Boolean(formik.errors.password1)}
                           helperText={formik.touched.password1 && formik.errors.password1}
                        />
                     </Grid>
                     <Grid item xs={12}>
                        <TextField
                           required
                           fullWidth
                           name="password2"
                           label="Confirm Password"
                           type="password"
                           id="password2"
                           autoComplete="new-password"
                           value={formik.values.password2}
                           onChange={formik.handleChange}
                           onBlur={formik.handleBlur}
                           error={formik.touched.password2 && Boolean(formik.errors.password2)}
                           helperText={formik.touched.password2 && formik.errors.password2}
                        />
                     </Grid>
                  </Grid>
                  <Button
                     type="submit"
                     fullWidth
                     variant="contained"
                     sx={{ mt: 3, mb: 2 }}
                  >
                     Sign Up
                  </Button>
               </form>
               <Grid container justifyContent="flex-end">
                  <Grid item>
                     <Link href="/login" variant="body2">
                        Already have an account? Log in
                     </Link>
                  </Grid>
               </Grid>
            </Container>
         </Box>
      </ThemeProvider>
   );
}

export default SignupView