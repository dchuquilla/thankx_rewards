/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useState} from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const Layout = ({ children }) => {
  const { isAuthenticated, logout } = useAuth();
  const [pointsBalance, setPointsBalance] = useState(null);
  const [redemptions, setRedemptions] = useState([]);

  useEffect(() => {
    const fetchPointsBalance = async () => {
      try {
        const response = await api.get('/v1/users/points_balance');
        console.log('response 1:', response.data);
        setPointsBalance(response.data.points);
      } catch (error) {
        console.error('Error fetching points balance:', error);
      }
    };
    const fetchRedemptions = async () => {
      try {
        const response = await api.get('/v1/users/redemptions');
        console.log('response 2:', response.data);
        setRedemptions(response.data);
      } catch (error) {
        console.error('Error fetching redemptions:', error);
      }
    };

    if (isAuthenticated()) {
      fetchPointsBalance();
      fetchRedemptions();
    } else {
      setPointsBalance(0);
      setRedemptions([]);
    }
  }, []);

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
              <a href="/profile" style={{ color: '#fff', textDecoration: 'none', marginRight: '10px' }}>Profile</a>
              <a href="#" onClick={handleLogout} style={{ color: '#fff', textDecoration: 'none' }}>Logout</a>
            </>
          ) : (
            <a href="/users/sign_in" style={{ color: '#fff', textDecoration: 'none' }}>Login</a>
          )}
        </div>
        <div>
          {isAuthenticated() ? (
            <span>Points Balance: {pointsBalance}</span>
          ) : (
            null
          )}
        </div>
      </nav>
      <main>
        {React.Children.map(children, child =>
          React.cloneElement(child, { pointsBalance, setPointsBalance, redemptions }) // Pass setPointsBalance as a prop
        )}
      </main>
    </div>
  );
};

export default Layout;
