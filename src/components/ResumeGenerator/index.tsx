import React, { useState, FormEvent, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './styles.css';

const ResumeGenerator: React.FC = () => {
    const [company, setCompany] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [taskId, setTaskId] = useState<number>();
    const { token } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const requestResult = async () => {
            const result = await axios.get(`${process.env.REACT_APP_API}/resume/results/${taskId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (result.data.finished) {
                navigate(`/edit/${result.data.resumeId}`);
            }
        }
        let intervalId: NodeJS.Timeout;
        if (isFetching) {
            intervalId = setInterval(requestResult, 5000); // Call every 5 seconds
        }
        return () => clearInterval(intervalId);
    }, [taskId]);
      
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_API}/resume/generate_resume`, {
                company,
                title: jobTitle,
                description: jobDescription
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setIsFetching(true);
            setTaskId(response.data.task_id);
        } catch (error) {
            console.log(String(error));
        }
    };

    return (
        <div style={{textAlign: 'left'}}>
            <form onSubmit={handleSubmit} className='job-form'>
            {!isFetching ?
                <>
                    <h2>Fill in the company info to generate your customized resume</h2>
                    <input type="text" placeholder="Company" value={company} onChange={(e) => setCompany(e.target.value)} />
                    <input type="text" placeholder="Job Title" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} />
                    <textarea placeholder="Job Description" value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} />
                    <button type="submit">Generate Resume</button>
                </>
                :<h2>Generating your resume. Please wait...</h2>
            }
            </form>
        </div>
    );
};

export default ResumeGenerator;
