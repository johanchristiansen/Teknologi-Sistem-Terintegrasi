import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import useAuth from '../hooks/useAuth';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [notification, setNotification] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const formData = new URLSearchParams();
      formData.append('username', username);
      formData.append('password', password);

      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      };

      const response = await api.post('/token', formData, config);
      const { access_token } = response.data;

      api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
      setError('');
      login(access_token);
      
      setNotification('Login successful! Redirecting...');
      setTimeout(() => navigate('/fragrance-list'), 2000);  // Redirect after 2 seconds

    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Invalid credentials');
      } else {
        setError('An unexpected error occurred');
      }
      setNotification('');
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {notification && <div style={{ color: 'green' }}>{notification}</div>}
    </div>
  );
};

export default Login;
