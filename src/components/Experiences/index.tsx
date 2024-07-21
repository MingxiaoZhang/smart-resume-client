import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import Modal from '../Modal';
import AddExperience from '../AddExperience';

export interface Experience {
    id: number;
    company: string;
    start_date: string;
    end_date: string | null;
    job_title: string;
    accomplishments: string[];
}

const Experiences: React.FC = () => {
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [message, setMessage] = useState<string>();
    const { token } = useAuth();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    useEffect(() => {
        const fetchExperiences = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API}/profile/get_experiences`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setExperiences(response.data.experiences);
            } catch (error) {
                setMessage('Failed to fetch experiences');
            }
        };
        if (token && !isModalOpen) {
            fetchExperiences();
        }
    }, [token, isModalOpen]);


    return (
        <div>
            <h2>Experiences</h2>
            {experiences && experiences.length > 0 ? experiences.map((exp, index) => (
                <div key={index}>
                    <h3>{exp.job_title} at {exp.company}</h3>
                    <p>From: {exp.start_date} To: {exp.end_date || 'Present'}</p>
                    <p>Accomplishments: {exp.accomplishments}</p>
                </div>
            )) :  message ? <p>{message}</p> : <div>No Experiences</div>
            }
            <button className="add-button" onClick={handleOpenModal}>
                Add
            </button>
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <AddExperience />
            </Modal>
        </div>
    );
};

export default Experiences;
