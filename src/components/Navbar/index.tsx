import React from 'react';
import './styles.css';
import { useAuth } from '../../context/AuthContext';

const Navbar: React.FC = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <nav className="navbar">
      <ul className="navbar-links">
      <div className="navbar-logo">
        <a href="/">Smart Resume</a>
      </div>
        <li><a href="/main">Home</a></li>
        <li><a href="/about">About</a></li>
      </ul>
      {isAuthenticated() ? 
        <div>
            <a href="/profile">Profile</a> 
        </div>
        :
        <div className="navbar-buttons">
        <button className="btn sign-up"><a href="/register">Sign Up</a></button>
        <button className="btn login"><a href="/login">Login</a></button>
      </div>
      }
      
    </nav>
  );
};

export default Navbar;
