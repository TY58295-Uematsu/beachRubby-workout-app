import { NavLink, useNavigate } from 'react-router';
import Header from '../../Header.tsx';
import { useAuth } from '../../../context/AuthContext.tsx';
import { useState } from 'react';
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
import ColorModeSelect from '../../../theme/ColorModeSelect.tsx';
import { GoogleIcon, FacebookIcon } from '../../../icons.tsx';
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

const Login = () => {
  let navigate = useNavigate();
  const { login } = useAuth();
  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [userNameError, setUserNameError] = useState<boolean>(false);
  const [userNameErrorMessage, setUserNameErrorMessage] = useState<string>('');
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>('');

  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
    if (e.target.value.trim() === '') {
      setUserNameErrorMessage('ユーザー名は必須です。');
      setUserNameError(true);
    } else {
      setUserNameErrorMessage('');
      setUserNameError(false);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (e.target.value.trim() === '') {
      setPasswordErrorMessage('パスワードは必須です。');
      setUserNameError(true);
    } else {
      setPasswordErrorMessage('');
      setUserNameError(false);
    }
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    let hasError = false;
    if (userName.trim() === '') {
      setUserNameErrorMessage('ユーザー名は必須です。');
      setUserNameError(true);

      hasError = true;
    } else {
      setUserNameErrorMessage('');
      setUserNameError(false);
    }

    if (password.trim() === '') {
      setPasswordErrorMessage('パスワードは必須です。');
      setUserNameError(true);

      hasError = true;
    } else {
      setPasswordErrorMessage('');
      setUserNameError(false);
    }

    if (hasError) {
      return;
    }

    console.log('handleSubmit_login');
    await fetch('/login', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        userName: userName,
        password: password,
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
    const userName = document.getElementById('userName') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;

    let isValid = true;

    if (!userName?.value || userName?.value.length < 4) {
      setUserNameError(true);
      setUserNameErrorMessage('Please enter a valid userName.');
      isValid = false;
      //   return
    } else {
      setUserNameError(false);
      setUserNameErrorMessage('');
    }

    if (!password?.value || password?.value.length < 4) {
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
        <SignInContainer direction="column" justifyContent="space-between">
          <ColorModeSelect
            sx={{ position: 'fixed', top: '1rem', right: '1rem' }}
          />
          <Card variant="outlined" sx={{ zIndex: 2 }}>
            <Typography
              component="h1"
              variant="h4"
              sx={{
                width: '100%',
                fontSize: 'clamp(2rem, 10vw, 2.15rem)',
                mt: '40px',
              }}
            >
              ログイン
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
                  onChange={handleUserNameChange}
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
                  onChange={handlePasswordChange}
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
      </Box>
      <Box
        sx={{
          backgroundImage: `url(${logo})`,
          backgroundSize: 'cover', // 画像をコンテナ全体に拡大縮小して表示
          width: '160px',
          height: '35px',
          position: 'absolute',
          top: 195,
          left: 905,
          zIndex: 100,
        }}
      />
    </>
  );
};

export default Login;
