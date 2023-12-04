// src/components/Register.js
import React, { useState } from 'react';
import api from '../services/api';

const Register = ({ onRegisterSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [registerError, setRegisterError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleRegister = async () => {
    try {
      const response = await api.post('/register', {
        username,
        password,
      });
  
      setSuccessMessage('Registration successful!');
      setRegisterError('');
      // onRegisterSuccess(response.data.access_token);
    } catch (error) {
      console.error('Registration error:', error.response);
  
      if (error.response && error.response.status === 400) {
        setRegisterError('Username is already taken. Choose a different username.');
      } else {
        setRegisterError('Registration failed. Please try again.');
      }
      setSuccessMessage('');
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
      {registerError && <div style={{ color: 'red' }}>{registerError}</div>}
      {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
    </div>
  );
};

export default Register;
