import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/viewCategory.css'; 

function ViewCategory() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState({ title: '', description: '', subcategories: [], createdAt: '' });
  const apiUrl = 'https://ai-task-manager-app.onrender.com';
  const [isDarkMode, setIsDarkMode] = useState(false); // State to handle theme

  useEffect(() => {
    axios.get(`${apiUrl}/categories/${id}`)
      .then(response => setCategory(response.data))
      .catch(error => console.error('Error fetching category:', error));
  }, [id]);

  const handleRemoveSubcategory = (index) => {
    const updatedSubcategories = category.subcategories.filter((_, i) => i !== index);
  
    // Update the category on the server
    axios.put(`${apiUrl}/categories/${id}`, { ...category, subcategories: updatedSubcategories })
      .then(() => {
        setCategory({ ...category, subcategories: updatedSubcategories });
      })
      .catch(error => console.error('Error updating subcategories:', error));
  };
  

  const handleDeleteCategory = () => {
    axios.delete(`${apiUrl}/categories/${id}`)
      .then(() => navigate('/mytasks'))
      .catch(error => console.error('Error deleting category:', error));
  };
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`category-container ${isDarkMode ? 'dark-mode' : 'light-mode'}`}e="category-container">
        {/* DARK MODE / LIGHT MODE TEST */}
        <div className="theme-switch-container">
        <label className="switch">
          <input type="checkbox" onChange={toggleTheme} checked={isDarkMode} />
          <span className="slider round"></span>
        </label>
      </div>
      <div className="category-header">
        <h2 className="category-title">{category.title}</h2>
        <p className="category-description">{category.description}</p>
        <p className="category-date">Created on: {new Date(category.createdAt).toLocaleDateString()}</p>
      </div>
      <div className="subcategories-container">
        {category.subcategories.map((subcategory, index) => (
          <div key={index} className="subcategory-card">
            <h3>{subcategory.title}</h3>
            <p>{subcategory.description}</p>
            <button onClick={()=>handleRemoveSubcategory(index)} className='remove-btn'>❌</button>
          </div>
        ))}
      </div>
      <div className="buttons-container">
        <button className="edit-category-button" onClick={()=> navigate(`/category/${id}`)}>Edit</button>
        <button className="delete-category-button" onClick={handleDeleteCategory}>Delete</button>
        <button className="back-button" onClick={() => navigate('/mytasks')}>Back</button>
      </div>
      
    </div>
  );
}

export default ViewCategory;
