import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const AddExperience: React.FC = () => {
    const [company, setCompany] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [accomplishments, setAccomplishments] = useState('');
    const [message, setMessage] = useState('');
    const { token } = useAuth();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_API}/profile/add_experience`, {
                company,
                start_date: startDate,
                end_date: endDate,
                job_title: jobTitle,
                accomplishments
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMessage(`Successfully added experience of ${jobTitle} at ${company}`);
            setCompany('');
            setStartDate('');
            setEndDate('');
            setJobTitle('');
            setAccomplishments('');
        } catch (error) {
            setMessage(String(error));
        }
    };

    return (
        <div>
            <h2>Add Experience</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Company" value={company} onChange={(e) => setCompany(e.target.value)} />
                <input type="date" placeholder="Start Date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                <input type="date" placeholder="End Date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                <input type="text" placeholder="Job Title" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} />
                <textarea placeholder="Accomplishments" value={accomplishments} onChange={(e) => setAccomplishments(e.target.value)} />
                <button type="submit">Add Experience</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AddExperience;
