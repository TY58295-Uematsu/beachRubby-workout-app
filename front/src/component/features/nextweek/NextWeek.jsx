import { useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import Header from '../../Header';
import { useAuth } from '../../../context/AuthContext';

import SunnyIcon from '@mui/icons-material/Sunny';

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
      <div className="">
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
      </div>
    </>
  );
};

export default NextWeek;
