import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import useAuth from '../hooks/useAuth';
import axios from 'axios';
import querystring from "querystringify";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [notification, setNotification] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Login ke layanan eksternal
      const dataForApiCore = querystring.stringify({
        // Menggunakan querystring untuk format application/x-www-form-urlencoded
        username: username,
        password: password,
      });
      const externalResponse = await api.api2.post('/login', dataForApiCore, {
        // Menggunakan dataForApi2 sebagai data
        headers: {
          "Content-Type": "application/x-www-form-urlencoded", // Mengatur tipe konten
        },
      })
      const externalToken = externalResponse.data.access_token;
      localStorage.setItem('externalAccessToken', externalToken);

      // Login ke layanan internal menggunakan api.js

      // Simpan kedua token tersebut
      localStorage.setItem('externalAccessToken', externalToken);
      const formData = new URLSearchParams();
      formData.append('username', username);
      formData.append('password', password);

      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      };

      const response = await api.api1.post('/token', formData, config);
      const { access_token } = response.data;

      api.api1.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
      setError('');
      login(access_token);
      sessionStorage.setItem('username',username);
      
      setNotification('Login successful! Redirecting...');
      setTimeout(() => navigate('/fragrance-list'), 2000); 
    } catch (error) {
      console.log(error);
      setError('Login failed. Please check your credentials.');
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
