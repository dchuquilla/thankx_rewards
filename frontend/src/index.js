import React from 'react';
import { createRoot } from 'react-dom/client';
import AppRoutes from './routes';
import { AuthProvider } from './context/AuthContext';
import './index.css';
import Layout from './components/Layout';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <Layout>
        <AppRoutes />
      </Layout>
    </AuthProvider>
  </React.StrictMode>,
);
