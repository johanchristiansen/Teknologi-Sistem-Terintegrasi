import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import useAuth from './hooks/useAuth';
import Login from './components/Login';
import Register from './components/Register';
import UpdatePersonality from './components/UpdatePersonality';
import FragranceList from './components/FragranceList';
import Product from './components/Product';

const App = () => {
  const { isLoggedIn } = useAuth();

  const ProtectedRoute = ({ element }) => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      return <Navigate to="/login" />;
    }
    return element;
  };

  const Home = () => (
    <div>
      <h1>Welcome to the Fragrance App</h1>
      <Link to="/login"><button>Login</button></Link>
      <Link to="/register"><button>Register</button></Link>
    </div>
  );

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/update-personality" element={<ProtectedRoute element={<UpdatePersonality />} />} />
        <Route path="/fragrance-list" element={<ProtectedRoute element={<FragranceList />} />} />
        <Route path="/product/:Deskripsi_Kepribadian" element={<Product />} />
      </Routes>
    </Router>
  );
};

export default App;
