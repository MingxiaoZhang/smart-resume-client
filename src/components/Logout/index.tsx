import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

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
    <div>
      <h2>Logout</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
