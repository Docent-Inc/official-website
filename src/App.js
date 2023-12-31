import React from 'react';
import {BrowserRouter as Router,  Route, Routes} from 'react-router-dom';
import Home from './component/Home';
import DiaryRead from "./component/DiaryRead";
import LoginPage from "./component/LoginPage";
import Callback from "./component/Callback";
import CreateGodDream from "./component/CreateGodDream";
import CreateDream from "./component/CreateDream";
import MyPage from "./component/Mypage";

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Home />} />
                 <Route path="/createDream" element={<CreateDream />} />
                <Route path="/diary/:id" element={<DiaryRead /> } />
                <Route path="/loginpage" element={<LoginPage /> } />
                <Route path="/kakao" element={<Callback />} />
                <Route path="/creategoddream" element={<CreateGodDream />} />
                <Route path="/myPage" element={<MyPage />} />
            </Routes>

        </Router>
    );
}

export default App;

