// src/App.tsx
import React from 'react';
import { motion } from 'framer-motion';
import './styles.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const LandingPage: React.FC = () => {
    const navigate = useNavigate();
    const { token } = useAuth();
    const handleGetStarted = () => {
        if (token) {
            navigate('/main');
        } else {
            navigate('/login')
        }
      
    };
  
    return (
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: 0 }}
        exit={{ x: '-100%' }}
        transition={{ duration: 0.5 }}
        className="landing-page"
      >
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="info"
        >
          <h1>Welcome to Smart Resume</h1>
          <p>This app is designed to customize your resume for every unique job description.</p>
        </motion.div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="get-started-button"
          onClick={handleGetStarted}
        >
          Get Started
        </motion.button>
      </motion.div>
    );
};

export default LandingPage;
