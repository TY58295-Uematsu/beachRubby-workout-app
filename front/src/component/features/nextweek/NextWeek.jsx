import { useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import Header from '../../Header';
import { useAuth } from '../../../context/AuthContext';

import SunnyIcon from '@mui/icons-material/Sunny';
import LocalDrinkIcon from '@mui/icons-material/LocalDrink';
import SportsFootballIcon from '@mui/icons-material/SportsFootball';
import { Box, Card, CardContent, Container, Grid, Typography } from '@mui/material';

const NextWeek = () => {
  const [nextSunday, setNextSunday] = useState('');
  const [fetchData, setFetchData] = useState([]);
  const [fetchToggle, setFetchToggle] = useState(false);
  const [temperature, setTemperature] = useState('');
  const [temperatureDate, setTemperatureDate] = useState('');
  const { user } = useAuth();

  // 次回の練習の日付をとってきたい。
  useEffect(() => {
    let today = new Date();
    let thisYear = today.getFullYear();
    let thisMonth = today.getMonth(); // 0-indexed (0: Jan, 11: Dec)
    let date = today.getDate();
    let day_num = today.getDay(); // 0: Sun, 6: Sat
    let nextSundayDate = date - day_num + 7;
    let thisSundayDate = date - day_num;

    let daysInThisMonth = new Date(thisYear, thisMonth + 1, 0).getDate(); // 今月の日数

    let nextSundayMonth = thisMonth;
    let nextSundayYear = thisYear;
    let nextSundayDay = nextSundayDate;

    if (nextSundayDate > daysInThisMonth) {
      // 来月の日付になった場合
      nextSundayMonth++;
      nextSundayDay = nextSundayDate - daysInThisMonth;
      if (nextSundayMonth > 11) {
        nextSundayMonth = 0; // 12月を超えたら1月
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

  //   ログイン機能実装後改修
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

      if (query.month.length === 1) {
        query.month = '0' + query.month;
      }
      if (query.date.length === 1) {
        query.date = '0' + query.date;
      }

      const url = `/api/thisweek?users.name=${user}&wo.workout_day=${query.year}-${query.month}-${query.date}`;
      fetch(url)
        .then((res) => res.json())
        .then((data) => setFetchData(data));
    }
  }, [nextSunday, fetchToggle]);

  useEffect(() => {
    if (fetchData.length) {
      console.log('fetchData', fetchData);
    }
  }, [fetchData]);

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
      {/* <div className="">
          次回練習日：
        <h1>
          {`${nextSunday.year}年${nextSunday.month}月${nextSunday.date}日`}
        </h1>
        気温：{temperature}℃
        <SunnyIcon/>

        <div>
          次回の目標:<label>{fetchData[0]?.objective}</label>
        </div>
        <NavLink to="/thisweek" end>
          今週の練習
        </NavLink>
      </div> */}
      <Container maxWidth="md"  sx={{ mt: 4, py: 2 }}>
      <Grid container spacing={3} direction="column"> {/* 親のGridは縦並び */}

        {/* 次回の練習日（上部の単一項目） */}
        <Grid item xs={12}> {/* md={12} は省略可能。xs={12} で常に全幅 */}
          <Typography variant="h6" component="h2" gutterBottom>
            次回の練習日
          </Typography>
          <Typography
            variant="h4"
            component="h1"
            color="primary"
            gutterBottom
          >
            {`${nextSunday.year}年${nextSunday.month + 1}月${
              nextSunday.date
            }日`}
          </Typography>
        </Grid>

        {/* 気温グリッドと持ち物グリッドを横並びにするための新しいGrid container */}
        <Grid item xs={12}> {/* このGrid itemは、中の横並び要素をまとめる役割 */}
          <Grid container spacing={2} alignItems="stretch" > {/* ★★ ここがポイント ★★ */}
            {/* 気温グリッド */}
            <Grid item xs={12} sm={6}> {/* スマホでは縦並び(xs=12)、タブレット以上で横並び(sm=6) */}
              <Card sx={{ width:'400px',height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}> {/* 高さ100%にして、アイコンとテキストを均等に配置 */}
                <CardContent>
                  <Typography variant="h6" component="h2" gutterBottom>
                    気温：{temperature}℃
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}> {/* アイコンを中央寄せ */}
                    <SunnyIcon
                      sx={{ fontSize: 100, color: '#D34C2C' }} // height/widthよりfontSize推奨
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* 持ち物グリッド */}
            <Grid item xs={12} sm={6}> {/* スマホでは縦並び(xs=12)、タブレット以上で横並び(sm=6) */}
              <Card sx={{  width:'400px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}> {/* 高さ100%にして、アイコンとテキストを均等に配置 */}
                <CardContent>
                  <Typography variant="h6" component="h2" gutterBottom>
                    持ち物:
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, my: 2 }}> {/* 複数のアイコンを横並び中央寄せ */}
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

        {/* 次回の目標（下部の単一項目） */}
        <Grid item xs={12}>
          <Card sx={{ p: 2 }}>
            <CardContent>
              <Typography variant="h6" component="h2" gutterBottom>
                次回の目標 :
              </Typography>
              <Typography variant="h6" component="h2" gutterBottom>
                {fetchData[0]?.objective}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
    </>
  );
};

export default NextWeek;
