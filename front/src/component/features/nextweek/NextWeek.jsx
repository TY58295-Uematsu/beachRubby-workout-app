import { useEffect, useState } from 'react';
import Header from '../../Header';
import { useAuth } from '../../../context/AuthContext';
import SunnyIcon from '@mui/icons-material/Sunny';
import LocalDrinkIcon from '@mui/icons-material/LocalDrink';
import backgroundImage from './../../../assets/workout.jpg';

import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from '@mui/material';

const NextWeek = () => {
  const [nextSunday, setNextSunday] = useState('');
  const [fetchData, setFetchData] = useState([]);
  const [fetchAllData, setFetchALLData] = useState([]);
  const [otherPlayerData, setOtherPlayerData] = useState([]);
  const [fetchToggle, setFetchToggle] = useState(false);
  const [temperature, setTemperature] = useState('');
  const [temperatureDate, setTemperatureDate] = useState('');
  const { user } = useAuth();

  // 次回の練習の日付をとってきたい。
  useEffect(() => {
    let today = new Date();
    let thisYear = today.getFullYear();
    let thisMonth = today.getMonth(); 
    let date = today.getDate();
    let day_num = today.getDay(); 
    let nextSundayDate = date - day_num + 7;
    let thisSundayDate = date - day_num;

    let daysInThisMonth = new Date(thisYear, thisMonth + 1, 0).getDate(); 

    let nextSundayMonth = thisMonth;
    let nextSundayYear = thisYear;
    let nextSundayDay = nextSundayDate;

    if (nextSundayDate > daysInThisMonth) {
      // 来月の日付になった場合
      nextSundayMonth++;
      nextSundayDay = nextSundayDate - daysInThisMonth;
      if (nextSundayMonth > 11) {
        nextSundayMonth = 0; 
        nextSundayYear++;
      }
    }

    if (
      !Number.isNaN(nextSundayYear) &&
      !Number.isNaN(nextSundayMonth) &&
      !Number.isNaN(nextSundayMonth)
    ) {
      setNextSunday({
        year: nextSundayYear,
        month: nextSundayMonth,
        date: nextSundayDay,
      });
    }
  }, []);

  useEffect(() => {
    if (nextSunday.year !== 0 && !!nextSunday) {
      const thisSundayJapan = new Date(
        nextSunday.year,
        nextSunday.month,
        nextSunday.date
      );

      const query = {
        year: String(thisSundayJapan.getFullYear()),
        month: String(thisSundayJapan.getMonth() + 1),
        date: String(thisSundayJapan.getDate()),
      };
      console.log('query', query);

      if (query.month.length === 1) {
        query.month = '0' + query.month;
      }
      if (query.date.length === 1) {
        query.date = '0' + query.date;
      }

      let url = `/api/thisweek?users.name=${user}&wo.workout_day=${query.year}-${query.month}-${query.date}`;
      fetch(url)
        .then((res) => res.json())
        .then((data) => setFetchData(data));

      url = `/api/workout?users.name=${user}&wo.workout_day=${query.year}-${query.month}-${query.date}`;
      fetch(url)
        .then((res) => res.json())
        .then(({ data }) => {
          console.log('asas', data);

          setFetchALLData(data);
        });
    }
  }, [nextSunday, fetchToggle]);

  useEffect(() => {
    console.log('fetchALLData', fetchAllData);
    if (fetchAllData.length !== 0) {
      setOtherPlayerData(
        [...fetchAllData].filter((data) => data.name !== user)
      );
    }
  }, [fetchAllData]);

  //   気温をAPIで取得
  useEffect(() => {
    if (!!nextSunday) {
      fetch(
        'https://api.open-meteo.com/v1/forecast?latitude=34.915753&longitude=136.95516&daily=temperature_2m_max,uv_index_max,uv_index_clear_sky_max&timezone=Asia%2FTokyo'
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          const { temperature_2m_max, time } = data.daily;

          const workDayIndex = time.findIndex(
            (time) =>
              time ==
              `${nextSunday.year}-0${nextSunday.month + 1}-${nextSunday.date}`
          );
          console.log(temperature_2m_max, time, workDayIndex);
          setTemperature(temperature_2m_max[workDayIndex]);
          setTemperatureDate(time[workDayIndex]);
        });
    }
  }, [nextSunday]);

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
            backgroundColor: 'rgba(0, 0, 0, 0)', 
            zIndex: 1, 
          }}
        />
        <Container maxWidth="md" sx={{ mt: 4, py: 2 }}>
          <Grid container spacing={3} direction="column">
            <Grid item xs={12}>
              <Typography variant="h6" component="h2" gutterBottom>
                次回の練習日 :
              </Typography>
              <Typography
                variant="h4"
                component="h1"
                gutterBottom
              >
                {`${nextSunday.year}年${nextSunday.month + 1}月${
                  nextSunday.date
                }日`}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2} alignItems="stretch">
                <Grid item xs={12} sm={6}>
                  <Card
                    sx={{
                      width: '400px',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                  >
                    <CardContent>
                      <Typography variant="h6" component="h2" gutterBottom>
                        気温 ：{temperature}℃
                      </Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          my: 2,
                        }}
                      >
                        <SunnyIcon
                          sx={{ fontSize: 100, color: '#D34C2C' }} 
                        />
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Card
                    sx={{
                      width: '400px',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                  >
                    <CardContent>
                      <Typography variant="h6" component="h2" gutterBottom>
                        水分量  :  2L
                      </Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          gap: 1,
                          my: 2,
                        }}
                      >
                        <LocalDrinkIcon
                          sx={{ fontSize: 100, color: '#1E88E5' }}
                        />
                        <LocalDrinkIcon
                          sx={{ fontSize: 100, color: '#1E88E5' }}
                        />
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Card sx={{ p: 2 }}>
                <CardContent>
                  <Typography variant="h6" component="h2" gutterBottom>
                    次回の目標 :
                    <Typography
                      component="span"
                      variant="body1"
                      color="primary"
                      sx={{ ml: 1, fontWeight: 'bold' }}
                    >
                      {fetchData[0]?.objective || '目標が設定されていません'}
                    </Typography>
                  </Typography>
                  チームメイト
                  <Typography>
                    {otherPlayerData.length !== 0 &&
                      otherPlayerData.map((data) => (
                        <Box>
                          <Typography
                            component="span"
                            variant="body1"
                            sx={{ ml: 1, fontWeight: 'bold' }}
                          >
                            {`${data.name} : ${data.objective || `入力なし`}`}
                          </Typography>
                        </Box>
                      ))}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default NextWeek;
