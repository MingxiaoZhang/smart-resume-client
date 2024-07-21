import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

interface UserInfo {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
}

const UserInfo: React.FC = () => {
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [message, setMessage] = useState('');
    const { token } = useAuth(); 
    
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API}/profile/get_user_info`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUserInfo(response.data.user_info);
            } catch (error) {
                setMessage('Failed to fetch user info');
            }
        };
        if (token) {
            fetchUserInfo();
        }
    }, [token]);

    return (
        <div>
            <h2>User Info</h2>
            {message && <p>{message}</p>}
            {userInfo && (
                <div>
                    <p>Username: {userInfo.username}</p>
                    <p>Email: {userInfo.email}</p>
                    <p>First Name: {userInfo.first_name}</p>
                    <p>Last Name: {userInfo.last_name}</p>
                </div>
            )}
        </div>
    );
};

export default UserInfo;
