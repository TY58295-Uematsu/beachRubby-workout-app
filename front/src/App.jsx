import { createContext, useState } from 'react';
import Login from './component/features/login/Login';
import Register from './component/features/login/Register';
import NextWeek from './component/features/nextweek/NextWeek';
import ThisWeek from './component/features/thisweek/ThisWeek';
import Home from './component/Home';
import { BrowserRouter, Route, Routes } from 'react-router';

const useUser = () => {
  const [userObj, setUserObj] = useState("");
  return {
    userObj,
    setUserObj,
  };
};
export const UserContext = createContext();

function App() {
  return (
    <>
      <UserContext.Provider value={useUser()}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/nextweek" element={<NextWeek />} />
            <Route path="/thisweek" element={<ThisWeek />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;
