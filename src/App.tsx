import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Container from './container';
import Navbar from './components/Navbar';
import './App.css';
import { AuthProvider } from './context/AuthContext';

const App: React.FC = () => {
    return (
        <Router>
            <AuthProvider>
                <div className={'page'}>
                    <Navbar />
                    <Container />
                </div>
            </AuthProvider>
        </Router>
    );
};

export default App;
