import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app';

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
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); 