import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router';
import Header from '../../Header';

const Register = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  let navigate = useNavigate();


  const onChangeUserName = (e) => {
    setUserName(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('handleSubmit');
    fetch('/register', {
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
      .then((data) => console.log(data));
      navigate('/login')
  };

  return (
    <>
    <Header />
    <div className="">
      <h1>新規登録</h1>
      <form>
        <label>
          ユーザー名: <input name="userName" onChange={onChangeUserName} />
        </label>
        <br />
        <label>
          パスワード:{' '}
          <input type="password" name="password" onChange={onChangePassword} />
        </label>
        <br />
        <button type="button" onClick={handleSubmit}>
          登録
        </button>
      </form>
      <p>
        {/* <a href="/register">新規登録</a> */}
        <NavLink to="/login" end>
          ログイン
        </NavLink>
      </p>
    </div>
    </>
  );
};

export default Register;
