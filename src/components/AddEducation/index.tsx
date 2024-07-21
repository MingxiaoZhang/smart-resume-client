import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const AddEducation: React.FC = () => {
    const [school, setSchool] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [degree, setDegree] = useState('');
    const [courses, setCourses] = useState('');
    const [message, setMessage] = useState('');
    const { token } = useAuth();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_API}/profile/add_education`, {
                school,
                degree,
                start_date: startDate,
                end_date: endDate,
                courses_taken: courses
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMessage(`Successfully added education of ${degree} at ${school}`);
            setSchool('');
            setStartDate('');
            setEndDate('');
            setDegree('');
            setCourses('');
        } catch (error) {
            setMessage(String(error));
        }
    };

    return (
        <div>
            <h2>Add Education</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="School" value={school} onChange={(e) => setSchool(e.target.value)} />
                <input type="date" placeholder="Start Date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                <input type="date" placeholder="End Date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                <input type="text" placeholder="Degree" value={degree} onChange={(e) => setDegree(e.target.value)} />
                <textarea placeholder="Courses Taken" value={courses} onChange={(e) => setCourses(e.target.value)} />
                <button type="submit">Add Education</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AddEducation;
