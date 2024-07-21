import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const AddProject: React.FC = () => {
    const [projectName, setProjectName] = useState('');
    const [projectOrg, setProjectOrg] = useState('');
    const [projectLink, setProjectLink] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [accomplishments, setAccomplishments] = useState('');
    const [message, setMessage] = useState('');
    const { token } = useAuth();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_API}/profile/add_project`, {
                project_name: projectName,
                project_org: projectOrg,
                project_link: projectLink,
                start_date: startDate,
                end_date: endDate,
                accomplishments
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMessage(`Successfully added experience of ${projectName} at ${projectOrg}`);
            setProjectName('');
            setProjectOrg('');
            setProjectLink('');
            setStartDate('');
            setEndDate('');
            setAccomplishments('');
        } catch (error) {
            setMessage(String(error));
        }
    };

    return (
        <div>
            <h2>Add Project</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Project Name" value={projectName} onChange={(e) => setProjectName(e.target.value)} />
                <input type="text" placeholder="Organization" value={projectOrg} onChange={(e) => setProjectOrg(e.target.value)} />
                <input type="date" placeholder="Start Date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                <input type="date" placeholder="End Date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                <input type="text" placeholder="Link" value={projectLink} onChange={(e) => setProjectLink(e.target.value)} />
                <textarea placeholder="Accomplishments" value={accomplishments} onChange={(e) => setAccomplishments(e.target.value)} />
                <button type="submit">Add Project</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AddProject;
