import { NavLink, useNavigate } from 'react-router';
import Header from '../../Header';
import { useAuth } from '../../../context/AuthContext';
//====================================================================
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
// import ForgotPassword from './components/ForgotPassword';
import ColorModeSelect from './../../../theme/ColorModeSelect';
import { GoogleIcon, FacebookIcon, SitemarkIcon } from './../../../icons';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));
//========================================================================================================

const Login = () => {

  let navigate = useNavigate();
  const { login } = useAuth();
  const [userNameError, setUserNameError] = React.useState(false);
  const [userNameErrorMessage, setUserNameErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userNameError || passwordError) {
      e.preventDefault();
      return;
    }
    // const data = new FormData(e.currentTarget);
    const userName = document.getElementById('userName');
    const password = document.getElementById('password');

    console.log('handleSubmit_login');
    await fetch('/login', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        userName: userName.value,
        password: password.value,
      }),
    })
      .then((res) => res.json())
      .then(({ data, redirectTo }) => {
        console.log(data);
        login(data);
        if (redirectTo) {
          navigate(redirectTo); // ログイン成功後、'/thisweek' にリダイレクト
        }
      });
  };

  const validateInputs = async () => {
    const userName = document.getElementById('userName');
    const password = document.getElementById('password');

    let isValid = true;

    if (!userName.value || userName.value.length < 4) {
      setUserNameError(true);
      setUserNameErrorMessage('Please enter a valid userName.');
      isValid = false;
      //   return
    } else {
      setUserNameError(false);
      setUserNameErrorMessage('');
    }

    if (!password.value || password.value.length < 4) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 4 characters long.');
      isValid = false;
      //   return
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }
    return isValid;
  };

  return (
    <>
      <Header />

      <CssBaseline enableColorScheme />
      <SignInContainer direction="column" justifyContent="space-between">
        <ColorModeSelect
          sx={{ position: 'fixed', top: '1rem', right: '1rem' }}
        />
        <Card variant="outlined">
          <SitemarkIcon />
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 2,
            }}
          >
            <Box>
              <FormLabel htmlFor="text">ユーザー名</FormLabel>
              <TextField
                error={userNameError}
                helperText={userNameErrorMessage}
                id="userName"
                type="text"
                name="userName"
                placeholder="ユーザー名を入力してください"
                // autoComplete="userName"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={userNameError ? 'error' : 'primary'}
              />
            </Box>
            <Box>
              <FormLabel htmlFor="password">パスワード</FormLabel>
              <TextField
                error={passwordError}
                helperText={passwordErrorMessage}
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="current-password"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={passwordError ? 'error' : 'primary'}
              />
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={validateInputs}
            >
              Sign in
            </Button>
          </Box>
          <Divider>or</Divider>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => alert('Sign in with Google')}
              startIcon={<GoogleIcon />}
            >
              Sign in with Google
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => alert('Sign in with Facebook')}
              startIcon={<FacebookIcon />}
            >
              Sign in with Facebook
            </Button>
            <Typography sx={{ textAlign: 'center' }}>
              Don&apos;t have an account?{' '}
              <NavLink to="/register" end>
                Create New Account!
              </NavLink>
            </Typography>
          </Box>
        </Card>
      </SignInContainer>
    </>
  );
};

export default Login;
