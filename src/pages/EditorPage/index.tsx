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
    const { token } = useAuth();
    const [markdown, setMarkdown] = useState<string>();
    const handleEditorChange = ({ text }: { text: string }) => {
        setMarkdown(text);
    };

    useEffect(() => {
        const fetchResume = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API}/resume/get_resume`, {
                    headers: { Authorization: `Bearer ${token}` },
                    params: { resumeId: id }
                });
                setMarkdown(response.data.resume);
            } catch (error) {
                console.log(error);
            }
        };
        if (token) {
            fetchResume();
        }
    }, []);

    return (
        <MdEditor
            value={markdown}
            style={{ height: '100vh', paddingTop: '80px' }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={handleEditorChange}
        />
    );
};

export default EditorPage;
