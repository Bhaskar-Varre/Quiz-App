import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './categorie.css'; 
import '@fortawesome/fontawesome-free/css/all.min.css';

const categoryIcons = {
    9: 'fas fa-history', 
    10: 'fas fa-book',
    11: 'fas fa-film',
    12: 'fa-solid fa-music',
    13: 'fa-solid fa-masks-theater',
    14: 'fa-solid fa-tv',
    15: 'fa-solid fa-puzzle-piece',
    16: 'fa-solid fa-chess-board',
    17: 'fa-solid fa-tree',
    18: 'fa-solid fa-computer',
    19: 'fa-solid fa-calculator',
    20: 'fa-solid fa-timeline',
    21: 'fa-solid fa-volleyball',
    22: 'fa-solid fa-globe',
    23: 'fa-solid fa-history',
    24: 'fa-solid fa-republican',
    25: 'fa-solid fa-palette',
    26: 'fa-solid fa-person',
    27: 'fa-solid fa-dog',
    28: 'fa-solid fa-car',
    29: 'fa-solid fa-bed',
    30: 'fa-solid fa-mobile',
    31: 'fa-solid fa-dragon',
    32: 'fa-solid fa-hippo',
  
};

const CategoryList = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // Fetch categories 
        fetch('https://opentdb.com/api_category.php')
            .then((response) => response.json())
            .then((data) => {
                setCategories(data.trivia_categories);
            })
            .catch((error) => console.error(error));
    }, []);

    return (
        <div className="quiz-container">
            <div className='circle-1'>
                <div className='circle-2'>
                    <div className='circle-3'>
                        <h1 className="quiz-title" style={{ top: '291px', minHeight: '400px', position: 'relative' }}>Trivia Categories</h1>
                        <div className="row">
                            {categories.map((category) => (
                                <div key={category.id} className="col-md-4 mb-4">
                                    <Link to={`/quiz/${category.id}`} className="custom-link-class">
                                        <div className="card">
                                            <div className="card-body text-center">
                                                <i className={categoryIcons[category.id] || 'fas fa-question fa-3x mb-2'}></i>
                                                <h5 className="card-title">{category.name}</h5>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryList;
