import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router';
import Header from '../../Header';
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
import ColorModeSelect from './../../../theme/ColorModeSelect';
import { GoogleIcon, FacebookIcon, SitemarkIcon } from './../../../icons';
import backgroundImage from './../../../assets/register.jpg';
import logo from './../../../assets/logo.jpg';


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

const Register = () => {
  let navigate = useNavigate();
  const [userNameError, setUserNameError] = useState(false);
  const [userNameErrorMessage, setUserNameErrorMessage] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('handleSubmit_register');
    if (userNameError || passwordError) {
      e.preventDefault();
      return;
    }
    const userName = document.getElementById('userName');
    const password = document.getElementById('password');
    fetch('/register', {
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
      .then(({ redirectTo }) => {
        if (redirectTo) {
          navigate(redirectTo); 
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
    } else {
      setUserNameError(false);
      setUserNameErrorMessage('');
    }

    if (!password.value || password.value.length < 4) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 4 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }
    return isValid;
  };

  return (
    <>
      <Header />
      <Box
        sx={{
          backgroundImage: `url(${backgroundImage})`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center', 
          minHeight: '100vh', 
          display: 'flex',
          flexDirection: 'column',
          color: 'white', 
          position: 'relative', 
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.2)', 
            zIndex: 1, 
          }}
        />
      <CssBaseline enableColorScheme />
      <SignInContainer direction="column" justifyContent="space-between" s>
        <ColorModeSelect
          sx={{ position: 'fixed', top: '1rem', right: '1rem' }}
        />
        <Card variant="outlined" sx={{zIndex:2}}>
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)',mt:'40px' }}
          >
            Create New Account
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
              Create New Account
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
              Create New Account with Google
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => alert('Sign in with Facebook')}
              startIcon={<FacebookIcon />}
            >
              Create New Account with Facebook
            </Button>
          </Box>
        </Card>
      </SignInContainer>
      </Box>
      <Box
        sx={{
          backgroundImage: `url(${logo})`, 
          backgroundSize: 'cover', // 画像をコンテナ全体に拡大縮小して表示
          width: '160px',
          height: '35px',
          position: 'absolute', 
          top: 215, 
          left: 905, 
          zIndex: 100, 
        }}
      />
    </>
  );
};

export default Register;
