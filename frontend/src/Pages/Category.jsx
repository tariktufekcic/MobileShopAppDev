import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Category = () => {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:8080/cat/categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Failed fetching categories', error);
            }
        };
        fetchCategories();
    }, []);

    const handleClickCategory = (id) => {
        navigate(`/category-details/${id}`);
    };

    return (
        <div className='h-full grid grid-cols-3 gap-4 bg-gray-100 p-5'>
            {categories.map((category) => (
                <div
                    key={category._id}
                    className='border p-4 rounded shadow-lg cursor-pointer transform transition-transform hover:scale-105'
                    onClick={() => handleClickCategory(category._id)}
                >
                    <h2 className="text-lg font-semibold">{category.name}</h2>
                    <p className="text-gray-600">{category.description}</p>
                </div>
            ))}
        </div>
    );
};

export default Category;
