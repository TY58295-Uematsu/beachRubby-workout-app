const crypto = require('crypto');
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const db = require('./knex');
const authCheck = require('./authCheck');
const geminiRouter = require('./routes/gemini');

function setUpServer() {
  app.use(express.json());
  // 認証系
  // form からのリクエストを受けるために必要
  app.use(express.urlencoded({ extended: true }));

  // express でcookieを取得
  app.use(cookieParser());
  app.use(express.static('public'));

  app.use('/api/gemini', geminiRouter);

  const sessions = {};

  function hashPassword(password, salt) {
    // hex:16進数
    return crypto
      .createHash('sha256')
      .update(salt + password)
      .digest('hex');
  }

  function createSession(userName) {
    // ランダムなセッションIDを生成。（セッションハイジャック対策）
    //時間でセッション切れるようにしたい
    const sessionId = crypto.randomBytes(16).toString('hex');
    return sessionId;
  }

  const sql = async (obj = {}) => {
    const result = await db
      .select(
        'wtu.id',
        'wtu.objective',
        'wtu.reflection',
        'wtu.user_id',
        'users.name',
        'users.salt',
        'wtu.workout_id',
        'wo.workout_day',
        'wo.youtube_url',
        'wm1.workout_name as workout1',
        'wm2.workout_name as workout2',
        'wm3.workout_name as workout3',
        'wm4.workout_name as workout4',
        'wm5.workout_name as workout5',
        'wm6.workout_name as workout6'
      )
      .from('workout_to_users as wtu')
      .innerJoin('users', 'wtu.user_id', 'users.id')
      .innerJoin('workout as wo', 'wtu.workout_id', 'wo.id')
      .innerJoin('workout_menu as wm1', 'wo.workout1', 'wm1.id')
      .innerJoin('workout_menu as wm2', 'wo.workout2', 'wm2.id')
      .innerJoin('workout_menu as wm3', 'wo.workout3', 'wm3.id')
      .innerJoin('workout_menu as wm4', 'wo.workout4', 'wm4.id')
      .innerJoin('workout_menu as wm5', 'wo.workout5', 'wm5.id')
      .innerJoin('workout_menu as wm6', 'wo.workout6', 'wm6.id')
      //   .whereBetween('wo.workout_day', ['2019-01-01', '2026-02-02']);
      //   .where('wo.workout_day', '2025-05-18');
      .where(obj);
    return result;
  };



  // ユーザー登録
  app.post('/register', async (req, res) => {
    console.log('register', req.body);
    const { userName, password } = req.body;
    const salt = crypto.randomBytes(6).toString('hex');
    const hashedPassword = hashPassword(password, salt);
    await db('users').insert({
      name: userName,
      password: hashedPassword,
      salt: salt,
    });
    res.status(201).json({ data: userName, redirectTo: '/login' });
  });

  app.post('/login', async (req, res) => {
    console.log('login', req.body);

    const { userName, password } = req.body;
    const user = await db('users').where('name', userName).first();
    if (!user) return res.status(404).send('no data');
    const inputHash = hashPassword(password, user.salt);
    if (inputHash !== user.password) {
      console.log('ハッシュ値称号失敗');
      return res.status(404).send('no data');
    }
    // ログインが成功したらセッションを手動で作成
    //セッション作る関数にDB操作も追加したい（sessionオブジェクト無くしたい）
    const sessionId = createSession(userName);
    console.log('ログイン時に生成されたsessionId', sessionId);
    await db('users').where('name', user.name).update('session_id', sessionId);
    // httpOnly:true  JSからこのクッキーにアクセスできないようにする。（クロスサイトスクリプティングによるセッションID盗難のリスク低減）
    res.cookie('sessionId', sessionId, {
      httpOnly: true,
      secure: false,
      sameSite: 'Lax', // クロスサイトリクエスト時のクッキー送信を制御。
    });
    res.status(200).json({ data: userName, redirectTo: '/thisweek' });
  });

  if (process.env.ISTEST !== 'test_no_auth') {
    app.use(authCheck);
  }

  app.get('/api', async (req, res) => {
    const test = await sql();
    res.send(test);
  });

  // ログアウト
  app.get('/logout', async (req, res) => {
    const userName = req.query['users.name'];
    const sessionId = req.cookies.sessionId;
    await db('users').where('name', userName).update(`session_id`, null);
    res.clearCookie('sessionId');
    res.status(200).send('you logged out succesfully!');
  });

  // 今週の全データを渡す。レコードがなければ作成する。
  app.get('/api/thisweek', async (req, res) => {
    const query = req.query;
    let resObj = await sql(query);
    if (resObj.length === 0) {
      const user = await db('users')
        .select('id')
        .where('name', query['users.name'])
        .first();
      const workout = await db('workout')
        .select('id')
        .where('workout_day', query['wo.workout_day'])
        .first();
      await db('workout_to_users').insert({
        user_id: user.id,
        workout_id: workout.id,
      });
      resObj = await sql(query);
    }
    res.status(200).json(resObj);
  });

  //   YutubeURL保存
  app.patch('/api/thisweek/url', async (req, res) => {
    const payload = req.body;
    await db('workout')
      .where('id', payload.workout_id)
      .update({ youtube_url: payload.youtube_url });
    const resObj = await db('workout').where('id', payload.workout_id);
    res.status(201).json({ data: resObj });
  });

  //振り返りを更新する
  app.patch('/api/thisweek/ref', async (req, res) => {
    const payload = req.body;
    if (payload.reflection) {
      await db('workout_to_users')
        .where('id', payload.id)
        .update({ reflection: payload.reflection });
      const resObj = await db('workout_to_users')
        .where('id', payload.id)
        .first();
      return res.status(201).json({ data: resObj });
    } else {
      await db('workout_to_users')
        .where('id', payload.id)
        .update({ objective: payload.objective });
      const resObj = await db('workout_to_users')
        .where('id', payload.id)
        .first();
      return res.status(201).json({ data: resObj });
    }
  });
  //次回のレコードすでに持っている場合、目標を更新する
  app.patch('/api/thisweek/obj', async (req, res) => {
    const payload = req.body;
    await db('workout_to_users')
      .where('id', payload.id)
      .update({ objective: payload.objective });
    const resObj = await db('workout_to_users').where('id', payload.id).first();
    return res.status(201).json({ data: resObj });
  });

  //   次週の目標を保存しているか（次週のレコード持っているか）確認
  app.get('/api/nextweek', async (req, res) => {
    const id = Number(req.query.id);
    const userName = req.query['users.name'];
    const { id: userId } = await db('users').where('name', userName).first();
    console.log();

    const nextSunday = await db('workout_to_users')
      .where('id', '>', id)
      .andWhere('user_id', Number(userId))
      .first();
    res.status(200).json({ data: nextSunday });
  });

  //   ユーザーが次週のテーブルを持っていない時、目標と一緒に作成
  app.post('/api/nextweek/obj', async (req, res) => {
    const payload = req.body;
    await db('workout_to_users').insert(payload);
    const resObj = await db('workout_to_users').orderBy('id', 'desc').first();
    res.status(201).json({ data: resObj });
  });

  //チームメイトのやつも含めて全部取ってくる
  app.get('/api/workout', async (req, res) => {
    const payload = req.query;
    const resArray = await sql({ 'wo.workout_day': payload['wo.workout_day'] });
    res.status(200).json({ data: resArray });
  });
  return app;
}

module.exports = setUpServer;
