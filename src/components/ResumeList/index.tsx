import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import Modal from '../Modal';
import './styles.css';
import { useNavigate } from 'react-router-dom';

export interface Resume {
    id: number;
    company: string;
    creation_date: string;
    last_edit_date: string;
    job_title: string;
}

const ResumeList: React.FC = () => {
    const [resumes, setResumes] = useState<Resume[]>([]);
    const [message, setMessage] = useState<string>();
    const { token } = useAuth();
    const user = localStorage.getItem('user');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchResumes = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API}/resume/get_all_resume`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setResumes(response.data.resumeList);
            } catch (error) {
                setMessage(String(error));
            }
        };
        if (token) {
            fetchResumes();
        }
    }, [token]);

    const handleClickResume = (id: number) => {
        navigate(`/edit/${id}`);
    }


    return (
        <div className="resume-list">
            <h2>{user}'s Resumes</h2>
            <ul>
                {resumes && resumes.length > 0 ? resumes.map((resume, index) => (
                    <li key={index} className="list-item" onClick={() => {handleClickResume(resume.id)}}>
                        <span className="title">{resume.job_title} at {resume.company}</span>
                        <span className="date">{resume.last_edit_date}</span>
                    </li>
                )) :  message ? <p>{message}</p> : <div>No resumes yet</div>
                }
            </ul>
        </div>
    );
};

export default ResumeList;
