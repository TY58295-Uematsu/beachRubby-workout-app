import { useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import Header from '../../Header';
import { useAuth } from '../../../context/AuthContext';
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Card,
  CardContent,
  Link as MuiLink, // Material-UIのLinkコンポーネントとreact-routerのLinkの衝突を避ける
} from '@mui/material';

const ThisWeek = () => {
  const [reflection, setReflection] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [objective, setObjective] = useState('');
  const [thisSunday, setThisSunday] = useState({ year: 0, month: 0, date: 0 });
  const [fetchData, setFetchData] = useState([]);
  const [fetchToggle, setFetchToggle] = useState(false);
  const [isDonePost, setIsDonePost] = useState(false);
  const [nextWorkoutId, setNextWorkoutId] = useState(0);
  const { user } = useAuth();

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

      const url = `/api/thisweek?users.name=${user}&wo.workout_day=${query.year}-${query.month}-${query.date}`;
      fetch(url)
        .then((res) => res.json())
        .then((data) => setFetchData(data));
    }
  }, [thisSunday, fetchToggle]);

  //来週の目標書いてあるか確認
  useEffect(() => {
    console.log('fetchData', fetchData);
    if (fetchData.length) {
      const url = `api/nextweek?users.name=${user}&id=${fetchData[0].id}`;
      fetch(url)
        .then((res) => res.json())
        .then(({ data }) => {
          console.log('来週のレコード', data);

          if (!!data) {
            setIsDonePost(true);
            setNextWorkoutId(data.id);
            console.log('来週の目標はすでにあります');
          } else {
            setIsDonePost(false);
            console.log('来週の目標はまだないです');
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
    fetch(`/api/thisweek/url?users.name=${user}`, {
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
    fetch(`/api/thisweek/ref?users.name=${user}`, {
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
      //すでに来週のレコードがあるので、パッチ
      console.log('すでに来週のレコードがあるので、パッチ');

      fetch(`/api/thisweek/ref?users.name=${user}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'PATCH',
        body: JSON.stringify({
          id: nextWorkoutId,
          objective: objective,
        }),
      })
        .then((res) => res.json())
        .then((data) => console.log(data));

      console.log(JSON.stringify({ youtube_url: youtubeUrl }));
      setFetchToggle(!fetchToggle);
    } else {
      //まだ来週のレコードがないので、ポスト
      console.log('すまだ来週のレコードがないので、ポスト');

      fetch(`/api/nextweek/obj?users.name=${user}`, {
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

      <Container maxWidth="md" sx={{ mt: 4, py: 2 }}>
        <Grid container spacing={3}> 
          {/* 左側の情報表示エリア */}
          <Grid item xs={12} md={6}> {/* ここを md={6} に修正 */}
            <Grid container spacing={3} direction="column">
              <Grid item>
                <Typography variant="h6" component="h2" gutterBottom>
                  前回の練習日
                </Typography>
                <Typography
                  variant="h4"
                  component="h1"
                  color="primary"
                  gutterBottom
                >
                  {`${thisSunday.year}年${thisSunday.month + 1}月${
                    thisSunday.date
                  }日`}
                </Typography>
              </Grid>

              <Grid item>
                <Card sx={{ p: 2 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      今回の目標:
                      <Typography
                        component="span"
                        variant="body1"
                        sx={{ ml: 1, fontWeight: 'bold' }}
                      >
                        {fetchData[0]?.objective || '目標が設定されていません'}
                      </Typography>
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item>
                <Card sx={{ p: 2 }}>
                  <CardContent>
                    {!!fetchData[0]?.youtube_url ? (
                      <Box>
                        <Typography variant="h6" gutterBottom>
                          練習動画：
                          <MuiLink
                            href={fetchData[0]?.youtube_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="body1"
                            sx={{ ml: 1 }}
                          >
                            動画リンク
                          </MuiLink>
                        </Typography>
                      </Box>
                    ) : (
                      <Box>
                        <Typography variant="h6" gutterBottom>
                          動画URL
                        </Typography>
                        <Grid container spacing={2} alignItems="center">
                          <Grid item xs={12} sm={8}>
                            <TextField
                              fullWidth
                              label="URLを入力..."
                              variant="outlined"
                              value={youtubeUrl}
                              onChange={onChangeUrl}
                              size="small"
                            />
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <Button
                              fullWidth
                              variant="contained"
                              onClick={patchUrl}
                              disabled={!youtubeUrl}
                            >
                              登録
                            </Button>
                          </Grid>
                        </Grid>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Grid>

              <Grid item>
                <Card sx={{ p: 2 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      反省点:
                      <Typography
                        component="span"
                        variant="body1"
                        sx={{ ml: 1, fontWeight: 'bold' }}
                      >
                        {fetchData[0]?.reflection ||
                          '反省点が入力されていません'}
                      </Typography>
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>

          {/* 右側のフォームエリア */}
          <Grid item xs={12} md={6}> {/* ここを md={6} に修正 */}
            <Box sx={{ p: 2 }}>
              <Typography variant="h6" component="h3" gutterBottom>
                フォーム
              </Typography>
              <Card sx={{ p: 2 }}>
                <CardContent>
                  <Grid container spacing={3} direction="column">
                    <Grid item>
                      <Typography variant="subtitle1" gutterBottom>
                        反省点
                      </Typography>
                      <TextField
                        fullWidth
                        label="反省点を入力..."
                        variant="outlined"
                        value={reflection}
                        onChange={onChangeReflection}
                        multiline
                        rows={2}
                      />
                      <Button
                        variant="contained"
                        onClick={patchRef}
                        sx={{ mt: 2 }}
                        disabled={!reflection}
                      >
                        反省を登録
                      </Button>
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" gutterBottom>
                        次回の目標
                      </Typography>
                      <TextField
                        fullWidth
                        label="来週の目標を入力..."
                        variant="outlined"
                        value={objective}
                        onChange={onChangeObjective}
                        multiline
                        rows={2}
                      />
                      <Button
                        variant="contained"
                        onClick={postObj}
                        sx={{ mt: 2 }}
                        disabled={!objective}
                      >
                        目標を登録
                      </Button>
                    </Grid>
                    {/* 来週の練習へのボタンはフォームグリッド内にあります */}
                    <Grid item xs={12} sx={{ mt: 3, textAlign: 'center' }}>
                      <Button
                        variant="outlined"
                        component={NavLink}
                        to="/nextweek"
                      >
                        来週の練習へ
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default ThisWeek;

{
  /* <main className="">
{/* {console.log(thisSunday)} */
}
// 前回の練習日
// <h1>
//   {`${thisSunday.year}年${thisSunday.month}月${thisSunday.date}日`}
// </h1>
// <div>
//   今回の目標:<label>{fetchData[0]?.objective}</label>
// </div>
// <div>
//   {!!fetchData[0]?.youtube_url ? (
//     <div>
//       練習動画：
//       <a href={fetchData[0]?.youtube_url} target="_blank">
//         動画リンク
//       </a>
//     </div>
//   ) : (
//     <div>
//       <label>動画URL</label>
//       <input
//         type="text"
//         onChange={onChangeUrl}
//         placeholder="URLを入力..."
//       />
//       {youtubeUrl}
//       <button onClick={patchUrl}>登録</button>
//     </div>
//   )}
// </div>
// <div>
//   <label>反省点:</label>
//   <span>{fetchData[0]?.reflection}</span>
// </div>
// {/* 入力フォーム */}
// <div>
//   <br />
//   ----------------------------------------
//   <br />
//   フォーム
//   <br />
//   <label>反省点</label>
//   <input
//     type="text"
//     onChange={onChangeReflection}
//     placeholder="反省点を入力..."
//   />
//   <button onClick={patchRef}>反省</button>
//   <label>次回の目標</label>
//   <input
//     type="text"
//     onChange={onChangeObjective}
//     placeholder="来週の目標を入力..."
//   />
//   <button onClick={postObj}>登録</button>
// </div>
// <NavLink to="/nextweek" end>
//   来週の練習
// </NavLink>
// </main> */}
