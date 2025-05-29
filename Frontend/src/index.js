import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import { AuthProvider } from './contexts/AuthContext';

// Suppress React DevTools warning
const originalConsoleError = console.error;
console.error = (...args) => {
  if (args[0]?.includes('Download the React DevTools')) return;
  if (args[0]?.includes('React Router Future Flag Warning')) return;
  originalConsoleError(...args);
};

// Suppress React Router warnings
const originalConsoleWarn = console.warn;
console.warn = (...args) => {
  if (args[0]?.includes('React Router Future Flag Warning')) return;
  originalConsoleWarn(...args);
};

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
); 