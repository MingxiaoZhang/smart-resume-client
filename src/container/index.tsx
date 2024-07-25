import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate, useLocation } from 'react-router-dom';
import Register from '../pages/RegisterPage';
import UserInfo from '../components/UserInfo';
import PrivateRoute from '../components/ProtectedRoute';
import Logout from '../components/Logout';
import MainPage from '../pages/MainPage';
import axios from 'axios';
import LandingPage from '../pages/LandingPage';
import LoginPage from '../pages/LoginPage';
import EditorPage from '../pages/EditorPage';
import Navbar from '../components/Navbar';
import ProfilePage from '../pages/ProfilePage';
import ResumeList from '../components/ResumeList';

const Container: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/main" element={<MainPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<LoginPage />} />
            <Route element={<PrivateRoute />}>
                <Route path="/profile" element={<ProfilePage />} />
            </Route>
            <Route element={<PrivateRoute />}>
                <Route path="/edit/:id" element={<EditorPage />} />
            </Route>
            <Route element={<PrivateRoute />}>
                <Route path="/logout" element={<Logout />} />
            </Route>
            <Route element={<PrivateRoute />}>
                <Route path="/resumes" element={<ResumeList />} />
            </Route>
        </Routes>
    );
};

export default Container;
