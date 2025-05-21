// import { useContext } from 'react';
import { useNavigate } from 'react-router';
// import { UserContext } from '../App';
import { useAuth } from '../context/AuthContext';


const Logout = () => {
  let navigate = useNavigate();
  const { user,logout, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const onClichLogout = async () => {
    // const data =
    await fetch(`/logout?users.name=${user}`);
    // .then((res) => res.json());
    //   .then((data) => console.log(data));
    // console.log(data);
    logout();
    navigate('/login');
  };

  return <button onClick={onClichLogout}>Logout</button>;
};

export default Logout;
