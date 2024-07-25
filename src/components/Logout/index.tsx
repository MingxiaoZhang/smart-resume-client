import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import "./styles.css";

const Logout: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  console.log("Logout")
  const handleLogout = () => {
    logout();
    navigate('/');
    console.log('Logged out');
  };

  return (
    <div className='logout-page'>
      <h2>Logout</h2>
      <button className='logout-button' onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
