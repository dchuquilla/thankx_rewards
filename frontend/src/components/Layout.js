import React from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const Layout = ({ children }) => {
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    api.delete('/users/sign_out', {
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        if (response.ok) {
          logout();
        }
      })
      .catch(error => {
        logout();
        console.error('Logout error:', error);
      });
  };

  return (
    <div>
      <nav>
        <a href="/">Home</a>
        /
        {isAuthenticated() ? (
          <a href="#" onClick={handleLogout}>Logout</a>
        ) : (
          <a href="/users/sign_in">Login</a>
        )}
      </nav>
      <main>
        {children}
      </main>
    </div>
  );
};

export default Layout;
