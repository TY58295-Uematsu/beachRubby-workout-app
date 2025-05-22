import Login from './component/features/login/Login.tsx';
import Register from './component/features/login/Register.tsx';
import NextWeek from './component/features/nextweek/NextWeek.tsx';
import ThisWeek from './component/features/thisweek/ThisWeek.tsx';
import Home from './component/Home.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { AuthProvider } from './context/AuthContext.tsx';
import ProtectedRoute from './routes/ProtectedRoute.tsx';


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
