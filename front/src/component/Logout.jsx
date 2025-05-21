import { useContext } from 'react';
import { useNavigate } from 'react-router';
import { UserContext } from '../App';

const Logout = () => {
  let navigate = useNavigate();
  const { userGlobal, setUserGlobal } = useContext(UserContext);

  const onClichLogout = async () => {
    // const data =
    await fetch(`/logout?user_name=${userGlobal}`);
    // .then((res) => res.json());
    //   .then((data) => console.log(data));
    // console.log(data);
    setUserGlobal('')
    navigate('/login');
  };

  return <button onClick={onClichLogout}>Logout</button>;
};

export default Logout;
