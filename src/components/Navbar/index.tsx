import React, { useEffect, useState } from 'react';
import './styles.css';
import { useAuth } from '../../context/AuthContext';

const Navbar: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const handleClick = () => {
    setIsOpen(false);
  };

  
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <a href="/">Smart Resume</a>
        <button className="navbar-toggle" onClick={toggleNavbar}>
          ☰
        </button>
      </div>
      <div className={`navbar-menu ${isOpen ? 'is-open' : ''}`}>
        <ul>
          <li><a href="/main">Create</a></li>
          <li><a href="/about">About</a></li>
          {
            isAuthenticated() ? 
            <>
              <li><a href="/profile">Profile</a></li>
              <li><a href="/resumes">Documents</a></li>
            </>:
            <>
              <li><a href="/login">Login</a></li>
              <li><a href="/register">Sign Up</a></li>
            </>
          }
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
