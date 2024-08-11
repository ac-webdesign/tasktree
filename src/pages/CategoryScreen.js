import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/categoryScreen.css'; 

function CategoryScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState({ title: '', description: '', subcategories: [] });
  const [newSubcategory, setNewSubcategory] = useState({ title: '', description: '' });
  const apiUrl = 'https://ai-task-manager-app.onrender.com';

  useEffect(() => {
    axios.get(`${apiUrl}/categories/${id}`)
      .then(response => setCategory(response.data))
      .catch(error => console.error('Error fetching category:', error));
  }, [id]);

  const handleSaveChanges = () => {
    axios.put(`${apiUrl}/categories/${id}`, category)
      .then(() => navigate('/mytasks'))
      .catch(error => console.error('Error updating category:', error));
  };

  const handleCancel = () => {
    navigate('/mytasks');
  };

  const handleAddSubcategory = () => {
    setCategory({
      ...category,
      subcategories: [...category.subcategories, newSubcategory]
    });
    setNewSubcategory({ title: '', description: '' });
  };
    const handleRemoveSubcategory = (index) => {
        const updatedSubcategories = category.subcategories.filter((_, i) => i !== index);
        setCategory({ ...category, subcategories: updatedSubcategories });
    };

    const handleEditSubcategory = (subcategory, index) => {
        navigate(`/edit-subcategory/${id}/${index}`, { state: { subcategory } });
    };
  return (
    <div className="category-container">
      <div className="category-header">
        <input
          className="category-title-input"
          type="text"
          placeholder="Category Title"
          value={category.title}
          onChange={(e) => setCategory({ ...category, title: e.target.value })}
        />
        <input
          className="category-description-input"
          type="text"
          placeholder="Category Description"
          value={category.description}
          onChange={(e) => setCategory({ ...category, description: e.target.value })}
        />
      </div>
      <div className="subcategories-container">
        {category.subcategories.map((subcategory, index) => (
          <div key={index} className="subcategory-card">
            <h3>{subcategory.title}</h3>
            <p>{subcategory.description}</p>
            <button onClick={() => handleEditSubcategory(subcategory, index)}>Edit</button>
            <button onClick={() => handleRemoveSubcategory(index)}>Remove</button>
          </div>
        ))}
      </div>
      <div className="new-subcategory-container">
        <input
          className="subcategory-title-input"
          type="text"
          placeholder="New Subcategory Title"
          value={newSubcategory.title}
          onChange={(e) => setNewSubcategory({ ...newSubcategory, title: e.target.value })}
        />
        <input
          className="subcategory-description-input"
          type="text"
          placeholder="New Subcategory Description"
          value={newSubcategory.description}
          onChange={(e) => setNewSubcategory({ ...newSubcategory, description: e.target.value })}
        />
        <button className="add-subcategory-button" onClick={handleAddSubcategory}>Add Subcategory</button>
      </div>
      <div className="buttons-container">
        <button className="save-button" onClick={handleSaveChanges}>Save Changes</button>
        <button className="cancel-button" onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
}

export default CategoryScreen;
