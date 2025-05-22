import './../App.css';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import Header from './/Header';
import { Alert, Box, Button, Card, Container, Typography } from '@mui/material';
import { CheckCircleOutline } from '@mui/icons-material';
import backgroundImage from './../assets/photo.jpg';
import logo from './../assets/logo.jpg';

const Home = () => {
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
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textAlign: 'center',
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
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            zIndex: 1,
          }}
        />

        <Container sx={{ zIndex: 2, py: 4 }}>
          <Card
            sx={{
              maxWidth: 650,
              mx: 'auto',
              p: 4,
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              borderRadius: 2,
              boxShadow: 3,
            }}
          >
            <Typography
              variant="h4"
              component="h2"
              gutterBottom
              color="text.primary"
            >
              ビーチラグビー練習会記録アプリ
            </Typography>
            <Typography variant="body1" color="text.secondary">
              <br />
              チームで練習会での目標や反省点を共有しましょう！
              <br />
              <br />
              このアプリでは、前回の練習の動画や、個人の目標・結果を管理することができます。
              <br />
              また、次回の練習日の気温・天候から、持参する水分量を提案します。
            </Typography>
            <Typography variant="body2" color="text.secondary">
              さあ、今すぐ始めてみませんか？
            </Typography>
          </Card>
          <Box
            sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}
          >
            <Button
              variant="contained"
              color="primary"
              size="large"
              component={NavLink}
              to="/login"
              sx={{ px: 5, py: 1.5 }}
            >
              ログイン
            </Button>
            <Button
              variant="contained"
              // color="#7CB342"
              size="large"
              component={NavLink}
              to="/register"
              sx={{
                px: 5,
                py: 1.5,
                backgroundColor: '#7CB342',
                '&:hover': {
                  backgroundColor: '#558B2F',
                },
              }}
            >
              新規登録
            </Button>
          </Box>
        </Container>
      </Box>
      <Box
        sx={{
          backgroundColor: 'transparent',
          width: '100%',
          py: 2,
          textAlign: 'center',
          position: 'absolute',
          top: 64,
          zIndex: 100,
        }}
      >
        <Typography
          variant="h5"
          component="h2"
          sx={{ color: 'white', textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}
        >
          昨日の自分を超えて行け、練習会記録アプリ
        </Typography>
      </Box>
      <Box
        sx={{
          backgroundColor: 'transparent',
          width: '1%',
          position: 'absolute',
          top: 400,
          left: 164,
          zIndex: 100,
        }}
      >
        <Typography
          variant="h5"
          component="h2"
          sx={{ color: 'white', textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}
        >
          青春は砂まみれ
        </Typography>
      </Box>
      <Box
        sx={{
          backgroundImage: `url(${logo})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '180px',
          height: '35px',
          position: 'absolute',
          top: 130,
          left: 770,
          zIndex: 100,
        }}
      />
    </>
  );
};

export default Home;
