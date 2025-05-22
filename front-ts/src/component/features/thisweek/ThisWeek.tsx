import { useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import Header from '../../Header.tsx';
import { useAuth } from '../../../context/AuthContext.tsx';
import {
  Box,
  Button,
  // Container,
  // Grid,
  TextField,
  // Typography,
  Card,
  CardContent,
  Link as MuiLink, // Material-UIのLinkコンポーネントとreact-routerのLinkの衝突を避ける
} from '@mui/material';
import { Container, Grid, Typography } from '@mui/material'; // 必要なコンポーネントを全てインポート
import backgroundImage from './../../../assets/workout.jpg';

export type FetchData = {
  id: number;
  objective: string;
  reflection: string;
  user_id: number;
  name: string;
  salt: string;
  workout_id: number;
  workout_day: string;
  youtube_url: string;
  workout1: string;
  workout2: string;
  workout3: string;
  workout4: string;
  workout5: string;
  workout6: string;
};

const ThisWeek = () => {
  const [reflection, setReflection] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [objective, setObjective] = useState('');
  const [thisSunday, setThisSunday] = useState({ year: 0, month: 0, date: 0 });
  const [fetchData, setFetchData] = useState<FetchData[]>([]);
  const [fetchAllData, setFetchALLData] = useState<FetchData[]>([]);
  const [otherPlayerData, setOtherPlayerData] = useState<FetchData[]>([]);
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

      let url = `/api/thisweek?users.name=${user}&wo.workout_day=${query.year}-${query.month}-${query.date}`;
      fetch(url)
        .then((res) => res.json())
        .then((data) => setFetchData(data));

      url = `/api/workout?users.name=${user}&wo.workout_day=${query.year}-${query.month}-${query.date}`;
      fetch(url)
        .then((res) => res.json())
        .then(({ data }) => {
          console.log(data);

          setFetchALLData(data);
        });
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
            // console.log(data);
            
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

  useEffect(() => {
    console.log('fetchALLData', fetchAllData);
    if (fetchAllData.length !== 0) {
      setOtherPlayerData(
        [...fetchAllData].filter((data) => data.name !== user)
      );
    }
  }, [fetchAllData]);

  const onChangeReflection = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReflection(e.target.value);
  };

  const onChangeUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    console.log('目標が投稿された');

    if (isDonePost) {
      //すでに来週のレコードがあるので、パッチ
      console.log('すでに来週のレコードがあるので、パッチ');

      fetch(`/api/thisweek/obj?users.name=${user}`, {
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
      console.log('まだ来週のレコードがないので、ポスト');

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

  const onChangeObjective = (e: React.ChangeEvent<HTMLInputElement>) => {
    setObjective(e.target.value);
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
            backgroundColor: 'rgba(0, 0, 0, 0)',
            zIndex: 1,
          }}
        />
        <Container maxWidth="md" sx={{ mt: 4, py: 2, zIndex: 2 }}>
          <Grid container spacing={3}>
            <Grid>
              <Grid container spacing={3} direction="column">
                <Grid>
                  <Typography variant="h6" component="h2" gutterBottom>
                    前回の練習日 :
                  </Typography>
                  <Typography variant="h4" component="h1" gutterBottom>
                    {`${thisSunday.year}年${thisSunday.month + 1}月${
                      thisSunday.date
                    }日`}
                  </Typography>
                </Grid>

                <Grid>
                  <Card sx={{ p: 2 }}>
                    <CardContent>
                      <Box>
                        <Typography variant="h6" gutterBottom>
                          今回の目標 :
                          <Typography
                            component="span"
                            variant="body1"
                            color="primary"
                            sx={{ ml: 1, fontWeight: 'bold' }}
                          >
                            {fetchData[0]?.objective ||
                              '目標が設定されていません'}
                          </Typography>
                        </Typography>
                      </Box>
                      チームメイト
                      <Box>
                        {otherPlayerData.length !== 0 &&
                          otherPlayerData.map((data, i) => (
                            <Box key={i}>
                              <Typography
                                key={i}
                                component="span"
                                variant="body1"
                                sx={{ ml: 1, fontWeight: 'bold' }}
                              >
                                {`${data.name} : ${
                                  data.objective || `入力なし`
                                }`}
                              </Typography>
                            </Box>
                          ))}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid>
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
                            <Grid>
                              <TextField
                                fullWidth
                                label="URLを入力..."
                                variant="outlined"
                                value={youtubeUrl}
                                onChange={onChangeUrl}
                                size="small"
                              />
                            </Grid>
                            <Grid>
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

                <Grid>
                  <Card sx={{ p: 2 }}>
                    <CardContent>
                      <Box>
                        <Typography variant="h6" gutterBottom>
                          反省点 :
                          <Typography
                            component="span"
                            variant="body1"
                            color="primary"
                            sx={{ ml: 1, fontWeight: 'bold' }}
                          >
                            {fetchData[0]?.reflection ||
                              '反省点が入力されていません'}
                          </Typography>
                        </Typography>
                      </Box>
                      チームメイト
                      <Box>
                        {otherPlayerData.length !== 0 &&
                          otherPlayerData.map((data, i) => (
                            <Box key={i}>
                              <Typography
                                key={i}
                                component="span"
                                variant="body1"
                                sx={{ ml: 1, fontWeight: 'bold' }}
                              >
                                {`${data.name} : '${
                                  data.reflection || '入力なし'
                                }`}
                              </Typography>
                            </Box>
                          ))}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Grid>

            {/* 右側のフォームエリア */}
            <Grid>
              <Box sx={{ p: 2 }}>
                <Card sx={{ p: 2, mt: 13 }}>
                  <CardContent>
                    <Grid container spacing={3} direction="column">
                      <Grid>
                        <Typography variant="h6" component="h3" gutterBottom>
                          Form :
                        </Typography>
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
                      <Grid>
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
                      <Grid sx={{ mt: 3, textAlign: 'center' }}>
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
      </Box>
    </>
  );
};

export default ThisWeek;
