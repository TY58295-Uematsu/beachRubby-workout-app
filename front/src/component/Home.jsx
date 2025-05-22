import './../App.css';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import Header from './/Header';
import { Alert } from '@mui/material';
import { CheckCircleOutline } from '@mui/icons-material';

const Home = () => {
  const [message, setMessage] = useState();

  useEffect(() => {
    fetch('/api')
      .then((res) => res.text())
      .then((data) => setMessage(data));
  }, []);
  return (
    <>
      <Header />

      ----------------------------------------------------------------------
      <nav>
        <NavLink to="/thisweek" end>
          今週の練習
        </NavLink>
        <NavLink to="/nextweek" end>
          来週の練習
        </NavLink>
        <NavLink to="/login" end>
          ログイン
        </NavLink>
        <NavLink to="/register" end>
          新規登録
        </NavLink>
      </nav>
      -----------------------------------------------------------------------
      {/* <div>Message from the backend: {message}</div> */}
    </>
  );
};

export default Home;
