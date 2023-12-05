// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import useAuth from './hooks/useAuth';
import Login from './components/Login';
import Register from './components/Register';
import UpdatePersonality from './components/UpdatePersonality';
import FragranceList from './components/FragranceList';

const App = () => {
  const { isLoggedIn } = useAuth();
  console.log(isLoggedIn);

  const ProtectedRoute = ({ element, path }) => {
    const token = localStorage.getItem("accessToken");
    if (!token){
      return <Navigate to="/login" /> 
    }
    return element;
    // console.log(isLoggedIn);
    // return isLoggedIn ? element : <Navigate to="/login" />;
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/update-personality"
            element={<ProtectedRoute element={<UpdatePersonality />} />}
          />
          <Route
            path="/fragrance-list"
            element={<ProtectedRoute element={<FragranceList />} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
