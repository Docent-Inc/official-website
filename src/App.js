import React from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import LoginPage from './component/LoginPage';
import MainPage from "./component/MainPage";
import Callback from "./component/Callback";

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<LoginPage />} />
                <Route path="/kakao" element={<Callback />} />
                <Route path="/main" element={<MainPage /> } />
            </Routes>
        </Router>
    );
}

export default App;

