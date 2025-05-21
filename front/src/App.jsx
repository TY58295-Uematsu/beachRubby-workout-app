import { createContext, useState } from 'react';
import Login from './component/features/login/Login';
import Register from './component/features/login/Register';
import NextWeek from './component/features/nextweek/NextWeek';
import ThisWeek from './component/features/thisweek/ThisWeek';
import Home from './component/Home';
import { BrowserRouter, createBrowserRouter, Route, RouterProvider, Routes } from 'react-router';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute';

// const useUser = () => {
//   const [userGlobal, setUserGlobal] = useState('');
//   return {
//     userGlobal,
//     setUserGlobal,
//   };
// };
// export const UserContext = createContext();

const router = createBrowserRouter([
  {
    path: '/',
    children: [
      { index: true, element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: '/nextweek', element: <NextWeek /> },
          { path: '/thisweek', element: <ThisWeek /> },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <>
      {/* <UserContext.Provider value={useUser()}> */}
        {/* <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/nextweek" element={<NextWeek />} />
            <Route path="/thisweek" element={<ThisWeek />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter> */}

        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      {/* </UserContext.Provider> */}
    </>
  );
}

export default App;
