import React, { useState, FormEvent, useEffect } from 'react';
import AddExperience from '../../components/AddExperience';
import Experiences, { Experience } from '../../components/Experiences';
import axios from 'axios';
import ResumeGenerator from '../../components/ResumeGenerator';
import { useAuth } from '../../context/AuthContext';
import UserInfo from '../../components/UserInfo';
import Educations from '../../components/Education';
import Projects from '../../components/Projects';
import './styles.css';

const ProfilePage: React.FC = () => {
    const user = localStorage.getItem('user');

    return (
        <div className='profile-page'>
            <h1>{user}</h1>
            <Educations />
            <hr />
            <Experiences />
            <hr />
            <Projects />
        </div>
    );
};

export default ProfilePage;
