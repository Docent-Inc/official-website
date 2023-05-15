import React from 'react';
import {BrowserRouter as Router,  Route, Routes} from 'react-router-dom';
import Home from './component/Home';
import CreateDream from './component/CreateDream';
import DiaryRead from "./component/DiaryRead";

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Home />} />
                 <Route path="/createDream" element={<CreateDream />} />
                <Route path="/diary/:id" element={<DiaryRead /> } />
            </Routes>

        </Router>
    );
}

export default App;

