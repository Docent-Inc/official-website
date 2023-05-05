import React from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import LoginPage from './component/LoginPage';
import MainPage from "./component/MainPage";
import Callback from "./component/Callback";
import MyPage from "./component/MyPage";

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<LoginPage />} />
                <Route path="/kakao" element={<Callback />} />
                <Route path="/main" element={<MainPage /> } />
                <Route path="/mypage" element={<MyPage /> } />
            </Routes>
        </Router>
    );
}

export default App;

