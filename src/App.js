import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './component/LoginPage';
import MainPage from "./component/MainPage";
import Callback from "./component/Callback";

function App() {
    const isAuthenticated = false; // 여기에 인증 로직을 추가하세요.

    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<LoginPage />} />
                <Route path="/auth/kakao/callback" element={<Callback />} />
                <Route path="/main" element={<MainPage />} />
            </Routes>
        </Router>
    );
}

export default App;
