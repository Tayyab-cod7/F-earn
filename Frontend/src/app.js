import React, { useEffect } from 'react';
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
import TermsAndConditions from './components/TermsAndConditions';
import Recharge from './components/Recharge';
import Withdraw from './components/Withdraw';
import { Box } from '@mui/material';
import io from 'socket.io-client';
import { useAuth } from './contexts/AuthContext';

// ProtectedRoute component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = Boolean(localStorage.getItem('token'));
  return isAuthenticated ? children : <Navigate to="/register" replace />;
};

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
      <Box sx={{
        pb: '64px', // Add padding-bottom equal to navbar height
        overflowY: 'auto', // Enable vertical scrolling if content overflows
        height: 'calc(100vh - 64px)', // Set height to allow scrolling
        // Hide scrollbar
        '&::-webkit-scrollbar': { display: 'none' }, // Hide scrollbar for Chrome, Safari, Edge
        scrollbarWidth: 'none', // Hide scrollbar for Firefox
        msOverflowStyle: '-ms-autohiding-scrollbar', // Hide scrollbar for Internet Explorer and Edge
      }}>
        <Outlet />
      </Box>
      <Navbar /> {/* Navbar is now at the bottom */}
    </>
  );
};

const socket = io('http://localhost:5000'); // Update with your backend URL

function App() {
  const { user, logout, loading: authLoading } = useAuth(); // Get user, logout, and auth loading

  useEffect(() => {
    // Only set up socket connection and listener if user data is available and not loading auth
    if (!authLoading && user && user.id) {
      console.log(`Setting up socket for user ID: ${user.id}`);
      // Register socket with user ID (optional depending on backend needs)
      // socket.emit('register', user.id);

      // Listen for account deletion specific to this user ID
      const userDeletedEvent = `user_deleted_${user.id}`;
      socket.on(userDeletedEvent, (data) => {
        console.log('Account deleted:', data.message);
        logout(); // This will clear the token and user and redirect to login
      });
      
      // Clean up the socket listener on component unmount or user change
      return () => {
        console.log(`Cleaning up socket listener for user ID: ${user.id}`);
        socket.off(userDeletedEvent);
      };
    } else if (!authLoading && !user) {
      // If not loading and no user, ensure socket listener is off
       console.log('No user or auth not loading, ensuring user_deleted listener is off.');
       // No specific user ID to listen for, ensure generic listener is off if it was ever on
       // (Though our current implementation uses specific user IDs in event name)
    }

  }, [user, logout, authLoading]); // Depend on user, logout, and authLoading

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

// Create router with future flags
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/register" replace />,
      },
      {
        path: 'home',
        element: <ProtectedRoute><Home /></ProtectedRoute>,
      },
      {
        path: 'task',
        element: <ProtectedRoute><Task /></ProtectedRoute>,
      },
      {
        path: 'team',
        element: <ProtectedRoute><Team /></ProtectedRoute>,
      },
      {
        path: 'vip',
        element: <ProtectedRoute><VIP /></ProtectedRoute>,
      },
      {
        path: 'me',
        element: <ProtectedRoute><Me /></ProtectedRoute>,
      },
      {
        path: 'recharge',
        element: <ProtectedRoute><Recharge /></ProtectedRoute>,
      },
      {
        path: 'withdraw',
        element: <ProtectedRoute><Withdraw /></ProtectedRoute>,
      },
    ],
  },
  {
    path: 'admin-dashboard',
    element: <ProtectedRoute><AdminDashboard /></ProtectedRoute>,
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
    path: 'terms-and-conditions',
    element: <TermsAndConditions />,
  }
], {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }
});

export default App; 