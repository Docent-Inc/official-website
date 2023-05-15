import React from 'react';
import {BrowserRouter as Router,  Route, Routes} from 'react-router-dom';
import Home from './component/Home';
import CreateDream from './component/CreateDream';

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Home />} />
                 <Route path="/createDream" element={<CreateDream />} />
            </Routes>

        </Router>
    );
}

export default App;

