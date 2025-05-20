import { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import Header from '../../Header';
import { UserContext } from '../../../App';

const ThisWeek = () => {
  const [reflection, setReflection] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [objective, setObjective] = useState('');
  const [thisSunday, setThisSunday] = useState({ year: 0, month: 0, date: 0 });
  const [fetchData, setFetchData] = useState([]);
  const [fetchToggle, setFetchToggle] = useState(false);
  const [isDonePost, setIsDonePost] = useState(false);
    const { userObj, setUserObj } = useContext(UserContext);
  

  useEffect(() => {
    console.log('THIsWeek.jsx');
    // 今回の練習の日付をとってきたい。
    let today = new Date();
    let thisYear = today.getFullYear();
    let thisMonth = today.getMonth(); // 0-indexed (0: Jan, 11: Dec)
    let date = today.getDate();
    let day_num = today.getDay(); // 0: Sun, 6: Sat
    let thisSundayDate = date - day_num;
    if (thisSundayDate <= 0) {
      // 今月の日付が日曜日を含まない場合、先月の日にちを計算
      let firstDayOfMonth = new Date(thisYear, thisMonth, 1);
      let lastDayOfLastMonth = new Date(
        firstDayOfMonth.setDate(firstDayOfMonth.getDate() - 1)
      );
      let daysInLastMonth = lastDayOfLastMonth.getDate();
      thisSundayDate = daysInLastMonth + thisSundayDate;
    }
    if (
      !Number.isNaN(thisYear) &&
      !Number.isNaN(thisMonth) &&
      !Number.isNaN(thisSundayDate)
    ) {
      setThisSunday({ year: thisYear, month: thisMonth, date: thisSundayDate });
    }
  }, []);

  //   fetchしたい
  useEffect(() => {
    if (thisSunday.year !== 0) {
      const thisSundayJapan = new Date(
        thisSunday.year,
        thisSunday.month,
        thisSunday.date
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

      const url = `/api/thisweek?wtu.user_id=1&wo.workout_day=${query.year}-${query.month}-${query.date}`;
      fetch(url)
        .then((res) => res.json())
        .then((data) => setFetchData(data));
    }
  }, [thisSunday, fetchToggle]);

  useEffect(() => {
    if (fetchData.length) {
      console.log('fetchData', fetchData);
    }
  }, [fetchData]);

  //来週の目標書いてあるか確認
  useEffect(() => {
    console.log('ssss', fetchData);
    if (fetchData.length) {
        console.log('qqqq', fetchData);
      const url = `api/nextweek?id=${fetchData[0].id}`;
      fetch(url)
        .then((res) => res.json())
        .then(({data}) => {
            if (data.length){
                setIsDonePost(true)
                console.log("来週の目標はすでにあります");
                
            }else{
                setIsDonePost(false)
                console.log("来週の目標はまだないです");
            }
        });
    }
  }, [fetchData, fetchToggle]);

  const onChangeReflection = (e) => {
    setReflection(e.target.value);
  };

  const onChangeUrl = (e) => {
    setYoutubeUrl(e.target.value);
  };

  const patchUrl = async () => {
    fetch('/api/thisweek/url', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PATCH',
      body: JSON.stringify({
        youtube_url: youtubeUrl,
        workout_id: fetchData[0].workout_id,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));

    console.log(JSON.stringify({ youtube_url: youtubeUrl }));
    setFetchToggle(!fetchToggle);
  };

  const patchRef = async () => {
    fetch('/api/thisweek/ref', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PATCH',
      body: JSON.stringify({ reflection: reflection, id: fetchData[0].id }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));

    // console.log(JSON.stringify({ youtube_url: youtubeUrl }));
    setFetchToggle(!fetchToggle);
  };

  const postObj = async () => {
    if (isDonePost) {
      fetch('/api/thisweek/ref', {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'PATCH',
        body: JSON.stringify({
          id: fetchData[0].id + 1,
          objective: objective,
        }),
      })
        .then((res) => res.json())
        .then((data) => console.log(data));

      console.log(JSON.stringify({ youtube_url: youtubeUrl }));
      setFetchToggle(!fetchToggle);
    } else {
      fetch('/api/nextweek/obj', {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          objective: objective,
          workout_id: fetchData[0].workout_id + 1,
          user_id: fetchData[0].user_id,
        }),
      })
        .then((res) => res.json())
        .then((data) => console.log(data));

      console.log(JSON.stringify({ youtube_url: youtubeUrl }));
      setFetchToggle(!fetchToggle);
      setIsDonePost(true);
    }
  };

  const onChangeObjective = (e) => {
    setObjective(e.target.value);
  };
  return (
    <>
    <Header />
{userObj}
    <main className="">
      {/* {console.log(thisSunday)} */}
      <h1>
        ThisWeek{`${thisSunday.year}年${thisSunday.month}月${thisSunday.date}`}
      </h1>
      <div>
        今回の目標:<label>{fetchData[0]?.objective}</label>
      </div>
      <div>
        {!!fetchData[0]?.youtube_url ? (
          <a href={fetchData[0]?.youtube_url} target="_blank">
            動画リンク
          </a>
        ) : (
          <>
            {' '}
            <label>動画URL</label>
            <input
              type="text"
              onChange={onChangeUrl}
              placeholder="URLを入力..."
            />
            {youtubeUrl}
            <button onClick={patchUrl}>登録</button>
          </>
        )}
      </div>
      <div>
        <label>反省点:</label>
        <span>{fetchData[0]?.reflection}</span>
      </div>

      {/* 入力フォーム */}
      <div>
        <br />
        ----------------------------------------
        <br />
        フォーム
        <br />
        <label>反省点</label>
        <input
          type="text"
          onChange={onChangeReflection}
          placeholder="反省点を入力..."
        />
        <button onClick={patchRef}>反省</button>
        <label>次回の目標</label>
        <input
          type="text"
          onChange={onChangeObjective}
          placeholder="来週の目標を入力..."
        />
        <button onClick={postObj}>登録</button>
      </div>
      <NavLink to="/nextweek" end>
        来週の練習
      </NavLink>
    </main>
    </>
  );
};

export default ThisWeek;
