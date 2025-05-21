import { useState, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router';
import Header from '../../Header';
import { UserContext } from '../../../App';

const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  let navigate = useNavigate();
  const { userGlobal, setUserGlobal } = useContext(UserContext);

  const onChangeUserName = (e) => {
    setUserName(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('handleSubmit');
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
      .then(({ data }) => {
        console.log(data);
        setUserGlobal(data);
      });

    navigate('/thisweek');
  };

  return (
    <>
      <Header />
      {userGlobal}
      <div className="">
        <h1>ログイン</h1>
        <form>
          <label>
            ユーザー名: <input name="userName" onChange={onChangeUserName} />
          </label>
          <br />
          <label>
            パスワード:{' '}
            <input
              type="password"
              name="password"
              onChange={onChangePassword}
            />
          </label>
          <br />
          <button type="submit" onClick={handleSubmit}>
            ログイン
          </button>
        </form>
        <p>
          {/* <a href="/register">新規登録</a> */}
          <NavLink to="/register" end>
            新規登録
          </NavLink>
        </p>
      </div>
    </>
  );
};

export default Login;
