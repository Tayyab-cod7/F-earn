import React from 'react';
import { RouterProvider, createBrowserRouter, Outlet, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Navbar from './components/Navbar';
import AdminDashboard from './components/AdminDashboard';
import Home from './components/Home';
import Task from './components/Task';
import Team from './components/Team';
import VIP from './components/VIP';
import Me from './components/Me';
import { Box } from '@mui/material';

// Create theme
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00ff88',
    },
    secondary: {
      main: '#ff4081',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
  },
});

// Layout component that includes Outlet and Navbar (now at the bottom)
const Layout = () => {
  return (
    <>
      {/* Main content area, adjusted for fixed bottom navbar */}
      <Box sx={{ pb: '64px' }}> {/* Add padding-bottom equal to navbar height */}
        <Outlet />
      </Box>
      <Navbar /> {/* Navbar is now at the bottom */}
    </>
  );
};

// Create router with future flags
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/home" replace />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'admin-dashboard',
        element: <AdminDashboard />,
      },
      {
        path: 'home',
        element: <Home />,
      },
      {
        path: 'task',
        element: <Task />,
      },
      {
        path: 'team',
        element: <Team />,
      },
      {
        path: 'vip',
        element: <VIP />,
      },
      {
        path: 'me',
        element: <Me />,
      },
    ],
  },
], {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

// Removed duplicate default export
export default App; 