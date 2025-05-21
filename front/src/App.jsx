import { createContext, useState } from 'react';
import Login from './component/features/login/Login';
import Register from './component/features/login/Register';
import NextWeek from './component/features/nextweek/NextWeek';
import ThisWeek from './component/features/thisweek/ThisWeek';
import Home from './component/Home';
import { BrowserRouter, createBrowserRouter, Route, RouterProvider, Routes } from 'react-router';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute';


const router = createBrowserRouter([
  {
    path: '/',
    children: [
      { index: true, element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: '*', element: <Home /> },
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
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
    </>
  );
}

export default App;
