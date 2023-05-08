import React from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import LoginPage from './component/LoginPage';
import MainPage from "./component/MainPage";
import Callback from "./component/Callback";
import MyPage from "./component/MyPage";
import CreateDream from "./component/CreateDream";
import DiaryRead from "./component/DiaryRead";

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<LoginPage />} />
                <Route path="/kakao" element={<Callback />} />
                <Route path="/main" element={<MainPage /> } />
                <Route path="/mypage" element={<MyPage /> } />
                <Route path="/createdream" element={<CreateDream /> } />
                <Route path="/diaryread/:diaryId" element={<DiaryRead /> } />
            </Routes>
        </Router>
    );
}

export default App;

