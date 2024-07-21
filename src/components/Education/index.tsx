import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import Modal from '../Modal';
import AddExperience from '../AddExperience';
import AddEducation from '../AddEducation';

export interface Education {
    id: number;
    school: string;
    degree: string | null;
    start_date: string;
    end_date: string | null;
    courses_taken: string[];
}


const Educations: React.FC = () => {
    const [education, setEducation] = useState<Education[]>([]);
    const [message, setMessage] = useState<string>();
    const { token } = useAuth();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    useEffect(() => {
        const fetchEducation = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API}/profile/get_education`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setEducation(response.data.education);
            } catch (error) {
                setMessage('Failed to fetch education');
            }
        };
        if (token && !isModalOpen) {
            fetchEducation();
        }
    }, [token, isModalOpen]);

    return (
        <div>
            <h2>Education</h2>
            {education && education.length > 0 ? education.map((edu, index) => (
                <div key={index}>
                    <h3>{edu.degree} at {edu.school}</h3>
                    <p>From: {edu.start_date} To: {edu.end_date || 'Present'}</p>
                    <p>Courses taken: {edu.courses_taken}</p>
                </div>
            )) :  message ? <p>{message}</p> : <div>No Education</div>
            }
            <button className="add-button" onClick={handleOpenModal}>
                Add
            </button>
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <AddEducation />
            </Modal>
        </div>
    );
};

export default Educations;
