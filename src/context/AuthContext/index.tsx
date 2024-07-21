import { jwtDecode } from 'jwt-decode';
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
    
interface AuthContextType {
    login: (user: string, token: string) => void;
    logout: () => void;
    token: string | undefined;
    isAuthenticated: () => boolean;
}
    
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string>();
    const navigate = useNavigate();

    useEffect(() => {
        const tokenStorage = localStorage.getItem('token');
        if (tokenStorage) {
            setToken(tokenStorage);
        }
    }, []);

    const login = (user: string, tokenContext: string) => {
        localStorage.setItem('token', tokenContext);
        localStorage.setItem('user', user);
        setToken(tokenContext);
        navigate('/main');
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(undefined);
        navigate('/login');
    };

    const isAuthenticated = () => {
        const tokenStorage = localStorage.getItem('token');

        if (!tokenStorage) {
            return false;
        }
        const decoded = jwtDecode(tokenStorage || '');

        if (!decoded.exp) {
            console.log('no exp')
            return false;
        }

        return decoded.exp > Date.now() / 1000;
    }

    return (
        <AuthContext.Provider value={{ login, logout, token, isAuthenticated }}>
        {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = React.useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};