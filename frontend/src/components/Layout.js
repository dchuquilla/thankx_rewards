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
        if (response.statusText === "OK") {
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
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', background: '#333', color: '#fff' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src="https://www.randomkittengenerator.com/cats/81846.1.jpg" alt="Logo" style={{ width: '40px', height: '40px', marginRight: '10px' }} />
          <a href="/" style={{ color: '#fff', textDecoration: 'none', marginRight: '10px' }}>Home</a>
          {isAuthenticated() ? (
            <>
              <a href="#" onClick={handleLogout} style={{ color: '#fff', textDecoration: 'none', marginRight: '10px' }}>Logout</a>
              <a href="/profile" style={{ color: '#fff', textDecoration: 'none' }}>Profile</a>
            </>
          ) : (
            <a href="/users/sign_in" style={{ color: '#fff', textDecoration: 'none' }}>Login</a>
          )}
        </div>
      </nav>
      <main>
        {children}
      </main>
    </div>
  );
};

export default Layout;
