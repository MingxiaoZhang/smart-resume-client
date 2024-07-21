import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import AddProject from '../AddProject';
import Modal from '../Modal';

export interface Project {
    id: number;
    project_name: string;
    project_org: string | null;
    start_date: string;
    end_date: string | null;
    project_link: string;
    accomplishments: string[];
}

const Projects: React.FC = () => {
    const [projects, setprojects] = useState<Project[]>([]);
    const [message, setMessage] = useState<string>();
    const { token } = useAuth();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API}/profile/get_projects`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setprojects(response.data.projects);
            } catch (error) {
                setMessage('Failed to fetch projects');
            }
        };
        if (token && !isModalOpen) {
            fetchProjects();
        }
    }, [token, isModalOpen]);

    return (
        <div>
            <h2>Project</h2>
            {projects && projects.length > 0 ? projects.map((project, index) => (
                <div key={index}>
                    <h3>{project.project_name} at {project.project_org}</h3>
                    <p>From: {project.start_date} To: {project.end_date || 'Present'}</p>
                    <p>Accomplishments: {project.accomplishments}</p>
                </div>
            )) : message ? <p>{message}</p> : <div>No Projects</div>}
            <button className="add-button" onClick={handleOpenModal}>
                Add
            </button>
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <AddProject />
            </Modal>
        </div>
    );
};

export default Projects;
