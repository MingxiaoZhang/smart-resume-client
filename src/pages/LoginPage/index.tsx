import React, { FormEvent, useEffect, useState } from 'react';
import { loginService } from '../../services/AuthService'
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './styles.css';
import { useAuth } from '../../context/AuthContext';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isAuthenticated } = useAuth();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Both fields are required');
      return
    }
    const response = await loginService(username, password);
    if (response.token) {
      setError('');
      console.log('Login successful');
      login(username, response.token);
      navigate('/main');
    } else {
      console.log('Login failed');
      setError(response.error || '');
    }
  };

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/main');
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="login"
    >
      <h2>Login</h2>
      <form className="login-form">
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
        {error && <p className="error-message">{error}</p>}
        <button onClick={handleLogin}>Login</button>
        <a href="/register">Don't have an account? Register here.</a>
      </form>
      
    </motion.div>
  );
};

export default LoginPage;
