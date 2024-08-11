import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/addCategory.css'; 
// import { format } from 'date-fns';

//STATE MANAGMENT USING REACT STATE HOOKS
function AddCategoryScreen() {
  const [categoryType, setCategoryType] = useState('task');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [subcategories, setSubcategories] = useState([]);
  const [subCategoryTitle, setSubCategoryTitle] = useState('');
  const [subCategoryDescription, setSubCategoryDescription] = useState('');
  const navigate = useNavigate();
  const apiUrl = 'https://ai-task-manager-app.onrender.com';

  //EVENT HANDLERS
  const handleAddSubcategory = () => {
    if (!subCategoryTitle || !subCategoryDescription) return;
    const newSubcategory = { title: subCategoryTitle, description: subCategoryDescription };
    setSubcategories([...subcategories, newSubcategory]);
    setSubCategoryTitle('');
    setSubCategoryDescription('');
  };

  const handleRemoveSubcategory = (index) => {
    const updatedSubcategories = [...subcategories];
    updatedSubcategories.splice(index, 1);
    setSubcategories(updatedSubcategories);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // const createdAt = format(new Date(), 'dd MMM yyyy HH:mm aa');
    const createdAt = new Date(); // new date instead of format 

    const categoryData = { title, description, subcategories ,createdAt,categoryType };
    console.log(categoryData); // Log the data to be sent

    axios.post(`${apiUrl}/categories`, categoryData)
      .then(response => {
        navigate('/mytasks');
      })
      .catch(error => console.error('Error adding category:', error));
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Add</h1>
      <form onSubmit={handleSubmit}>
      <div className="category-type-container">
          <div className="category-type-option">
            <input 
              type="radio" 
              name="categoryType" 
              id="task" 
              value="task" 
              checked={categoryType === 'task'} 
              onChange={() => setCategoryType('task')} 
            />
            <label htmlFor="task">Task</label>
          </div>
          <div className="category-type-option">
            <input 
              type="radio" 
              name="categoryType" 
              id="project" 
              value="project" 
              checked={categoryType === 'project'} 
              onChange={() => setCategoryType('project')} 
            />
            <label htmlFor="project">Project</label>
          </div>
          <div className="category-type-option">
            <input 
              type="radio" 
              name="categoryType" 
              id="note" 
              value="note" 
              checked={categoryType === 'note'} 
              onChange={() => setCategoryType('note')} 
            />
            <label htmlFor="note">Note</label>
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Title:</label>
          <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Description:</label>
          <textarea type="text" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>

        {categoryType !== 'note' && (
          <>
        <h2 className="mb-3">Subcategories:</h2>
        {subcategories.map((subcategory, index) => (
          <div key={index} className="mb-3 p-3 border rounded">
            <p><strong>Title:</strong> {subcategory.title}</p>
            <p><strong>Description:</strong> {subcategory.description}</p>
            <button type="button" className="btn btn-danger" onClick={() => handleRemoveSubcategory(index)}>Remove</button>
          </div>
        ))}
        <div className="mb-3">
          <label className="form-label">Subcategory Title:</label>
          <input type="text" className="form-control" value={subCategoryTitle} onChange={(e) => setSubCategoryTitle(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Subcategory Description:</label>
          <input type="text" className="form-control" value={subCategoryDescription} onChange={(e) => setSubCategoryDescription(e.target.value)} />
        </div>
        <button type="button" className="btn btn-secondary mb-3" onClick={handleAddSubcategory}>Add Subcategory</button>
        </>
        )}
        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Save</button>
          <button type="button" className="btn btn-outline-secondary" onClick={() => navigate('/home')}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default AddCategoryScreen;
