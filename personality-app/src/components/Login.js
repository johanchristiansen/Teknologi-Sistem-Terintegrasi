import React, { useState } from 'react';
import api from '../services/api';
import useAuth from '../hooks/useAuth';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const {login} = useAuth();

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
      console.log(response);
      const { access_token } = response.data;
      console.log(response.data);

      // Include the Bearer token in the headers for subsequent requests
      api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
      setError(''); // Clear any previous error
      login(access_token);
      //onLoginSuccess(access_token); // Pass the token to the parent component
      console.log(error);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Invalid credentials');
      } else {
        setError('An unexpected error occurred');
      }
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
    </div>
  );
};

export default Login;
