import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './component/LoginPage';
import RegisterPage from './component/RegisterPage';
import DiaryList from './component/DiaryList';

function App() {
    const isAuthenticated = false; // 여기에 인증 로직을 추가하세요.

    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route
                    path="/diary-list" element={<DiaryList />}
                />
            </Routes>
        </Router>
    );
}

export default App;
