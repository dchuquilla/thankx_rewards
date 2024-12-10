import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import api from '../../services/api';
import './AuthPage.css';
import FormInput from '../../components/FormInput/FormInput';

const AuthPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { setUser } = useContext(AuthContext);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      window.location.href = '/';
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/users/sign_in', { user: formData }, {
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json'
        }
      });
      const token = response.data.token || response.data.accessToken || response.headers['Authorization'];
      if (token) {
        localStorage.setItem('token', token);
        console.log('response:', response);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setUser(response.data.user);
        window.location.href = '/';
      } else {
        console.error('Token not found in response');
      }

    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else {
        console.error('Error:', error);
      }
    }
  };

  return (
    <div className="auth-page">
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <FormInput
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AuthPage;
