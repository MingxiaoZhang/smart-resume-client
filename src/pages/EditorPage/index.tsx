import React, { useEffect, useState } from 'react';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const mdParser = new MarkdownIt();

const EditorPage: React.FC = () => {
    const { id } = useParams();
    const { isAuthenticated } = useAuth();
    const [markdown, setMarkdown] = useState<string>();
    const handleEditorChange = ({ text }: { text: string }) => {
        setMarkdown(text);
    };

    useEffect(() => {
        const fetchResume = async () => {
            try {
                const token = localStorage.getItem('token')
                const response = await axios.get(`${process.env.REACT_APP_API}/resume/get_resume`, {
                    headers: { Authorization: `Bearer ${token}` },
                    params: { resumeId: id }
                });
                setMarkdown(response.data.resume);
            } catch (error) {
                console.log(error);
            }
        };
        if (isAuthenticated()) {
            fetchResume();
        }
    }, []);

    const handleSave = async () => {
        try {
            const token = localStorage.getItem('token')
            const response = await axios.put(`${process.env.REACT_APP_API}/resume/update_resume`,{
                resumeId: id,
                resumeText: markdown
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log(response.data.message);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <MdEditor
                value={markdown}
                style={{ height: '100vh', paddingTop: '80px', textAlign: 'left' }}
                renderHTML={(text) => mdParser.render(text)}
                onChange={handleEditorChange}
            />
            <button onClick={handleSave}>Save</button>
        </>
    );
};

export default EditorPage;
