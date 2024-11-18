import React from 'react';
import { createRoot } from 'react-dom/client';
import AppRoutes from './routes';
import { AuthProvider } from './context/AuthContext';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  </React.StrictMode>,
);
