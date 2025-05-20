import { useNavigate } from 'react-router';

const Logout = () => {
  let navigate = useNavigate();

  const onClichLogout = async () => {
    // const data = 
    await fetch('/logout')
    // .then((res) => res.json());
    //   .then((data) => console.log(data));
    // console.log(data);
    navigate('/login');
  };

  return <button onClick={onClichLogout}>Logout</button>;
};

export default Logout;
