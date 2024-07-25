import React, { useState, FormEvent, ReactNode } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import './styles.css';
import { registerService } from '../../services/AuthService';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const RegisterPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState<ReactNode>();
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const response = await registerService(username, password);
        if (response.token) {
        setError('');
        console.log('Register successful');
        login(username, response.token);
        navigate('/profile');
        } else {
        console.log('Register failed');
        setError(response.error || '');
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="register"
        >
            <h2>Register</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                {error && <p className="error-message">{error}</p>}
                <button type="submit">Register</button>
            </form>
            <a href="/login">Already have an account? Login Here</a>
        </motion.div>
    );
};

export default RegisterPage;
