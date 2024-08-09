// src/pages/EditSubcategoryScreen.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditSubcategoryScreen() {
  
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState({ title: '', description: '', subcategories: [] });
  useEffect(() => {
    axios.get(`/categories/${id}`)
      .then(response => setCategory(response.data))
      .catch(error => console.error('Error fetching category:', error));
  }, [id]);

  const handleSaveChanges = () => {
    axios.put(`/categories/${id}`, category)
      .then(() => navigate(`/category/${id}`))
      .catch(error => console.error('Error updating category:', error));
  };

  const handleCancel = () => {
    navigate(`/category/${id}`);
  };

  const handleSubcategoryChange = (index, field, value) => {
    const updatedSubcategories = [...category.subcategories];
    updatedSubcategories[index][field] = value;
    setCategory({ ...category, subcategories: updatedSubcategories });
  };

  return (
    <div className="category-container">
      <div className="category-header">
        <h2>Editing Subcategories for {category.title}</h2>
        <p>{category.description}</p>
      </div>
      <div className="subcategories-container">
        {category.subcategories.map((subcategory, index) => (
          <div key={index} className="subcategory-card">
            <input
              className="subcategory-title-input"
              type="text"
              placeholder="Subcategory Title"
              value={subcategory.title}
              onChange={(e) => handleSubcategoryChange(index, 'title', e.target.value)}
            />
            <input
              className="subcategory-description-input"
              type="text"
              placeholder="Subcategory Description"
              value={subcategory.description}
              onChange={(e) => handleSubcategoryChange(index, 'description', e.target.value)}
            />
          </div>
        ))}
      </div>
      <div className="buttons-container">
        <button className="save-button" onClick={handleSaveChanges}>Save Changes</button>
        <button className="cancel-button" onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
}

export default EditSubcategoryScreen;
