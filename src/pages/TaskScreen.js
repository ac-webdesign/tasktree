
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/homeScreen.css';
import HeaderTasks from '../components/HeaderTasks';
import Footer from '../components/Footer';
import '../styles/tasksScreen.css';

function TaskScreen() {
  const [categories, setCategories] = useState([]);
  const apiUrl = 'https://ai-task-manager-app.onrender.com';

  useEffect(() => {
    axios.get(`${apiUrl}/categories`)
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

   // DELETE A CATEGORY IF PRESSED 
  const handleDeleteCategory = (id) => {
    axios.delete(`${apiUrl}/categories/${id}`)
      .then(() => {
        setCategories(categories.filter(category => category._id !== id));
      })
      .catch(error => console.error('Error deleting category:', error));
  };

  const [activeMenuId, setActiveMenuId] = useState(null);

  const toggleMenu = (id) => {
    setActiveMenuId(prevId => (prevId === id ? null : id));
  };

  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveMenuId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="task-container">
      <HeaderTasks />
      
      <Link to="/generate-ai">
        <button className='main-button'>Generate a task with AI</button>
      </Link>          
      <Footer/>

      <div className="categories-list">
        {categories.map((category) => (
          <div key={category._id} className="category-card">
            <div className="blueline"></div>
            <div className="dot-grid">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
            <Link to={`/viewcategory/${category._id}`} style={{ textDecoration: 'none' }}>
              <div className="category-content">
                <h2 className="category-title">{category.title}</h2>
                <p className="category-description">{category.description}</p>
              </div>
            </Link>
            <div className="notification-circle">{category.subcategories.length}</div>
            <div className="twodots" onClick={() => toggleMenu(category._id)}>
              <div className="graydot"></div>
              <div className="graydot"></div>
              {activeMenuId === category._id && (
                <div className="menu" ref={menuRef}>
                  <div className="menu-item" onClick={() => handleDeleteCategory(category._id)}>Delete</div>
                  <div className="menu-item">Pin</div>
                  <Link to={`/category/${category._id}`} style={{ textDecoration: 'none' }}>
                    <div className="menu-item">Edit</div>
                  </Link>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskScreen;
