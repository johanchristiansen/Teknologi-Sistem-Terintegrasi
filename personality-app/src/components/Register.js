import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import api from '../services/api'; // Impor instance Axios Anda

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      // Register di layanan eksternal
      await axios.post('https://loanrecommendationapi.azurewebsites.net/register', {
        username,
        password
      });

      // Register di layanan internal menggunakan api.js
      await api.post('/register', {
        username,
        password
      });
      
      // Redirect ke halaman login setelah registrasi berhasil
      navigate('/login');
    } catch (error) {
      setError('Registration failed. Username might already be taken, or there was an error.');
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
      <button onClick={handleRegister}>Register</button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default Register;
