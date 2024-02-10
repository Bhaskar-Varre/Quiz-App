import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import CategoryList from './categorie';
import Quiz from './quiz';

function App() {
    return (
        <Router>
            <Routes>
            <Route exact path="/" element={<CategoryList />} />
            <Route exact path="/quiz/:categoryId" element={<Quiz/>} />


            </Routes>
        </Router>
    );
}

export default App;
