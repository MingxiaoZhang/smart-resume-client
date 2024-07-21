import React, { useState, FormEvent, useEffect } from 'react';
import AddExperience from '../../components/AddExperience';
import Experiences, { Experience } from '../../components/Experiences';
import axios from 'axios';
import ResumeGenerator from '../../components/ResumeGenerator';
import { useAuth } from '../../context/AuthContext';
import './styles.css'

const MainPage: React.FC = () => {
    const user = localStorage.getItem('user');
    return (
        <div className='main-page'>
            <div className='user'>
                <h1>Welcome back! {user}</h1>
            </div>
            <ResumeGenerator />
        </div>
    );
};

export default MainPage;
