
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/homeScreen.css'; 
import Footer from '../components/Footer';
import HeaderTasks from '../components/HeaderTasks';
import checkimage from '../images/check-mark.png';
import treeicon from '../images/tree-task-icon.png';
import SearchBar from '../components/SearchBar';
import { Link } from 'react-router-dom';

function HomeScreen() {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [activeSelection, setActiveSelection] = useState('tasks');
  const apiUrl = 'https://ai-task-manager-app.onrender.com';

  // FETCHING THE CATEGORIES 
  useEffect(() => {
    axios.get(`${apiUrl}/categories`)
      .then(response => {
        setCategories(response.data);
        setFilteredCategories(response.data.filter(category => category.categoryType === 'task').slice(0, 10));
      })
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  // HANDLE SEARCH FROM CATEGORIES
  const handleSearch = (query) => {
    if (query === '') {
      setFilteredCategories(categories.slice(0, 10));
    } else {
      const filtered = categories.filter(category =>
        category.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredCategories(filtered);
    }
  };

  // HANDLE SELECTION TASKS, PROJECTS, NOTES 
  const handleSelectionChange = (selection) => {
    setActiveSelection(selection);

    if (selection === 'tasks') {
      setFilteredCategories(categories.filter(category => category.categoryType === 'task').slice(0, 10));
    } else if (selection === 'projects') {
      setFilteredCategories(categories.filter(category => category.categoryType === 'project').slice(0, 10));
    } else if (selection === 'notes') {
      setFilteredCategories(categories.filter(category => category.categoryType === 'note').slice(0, 10));
    }
  };

  return (
    <div className="home-container">

      {/* HEADER */}
      <HeaderTasks /> 

      {/* SEARCH BAR */}
      <SearchBar handleSearch={handleSearch} />

      {/* SELECTION CONTAINER TASKS, PROJECTS, NOTES */}
      <div className="selection-container">
        <div
          className={`my-tasks selection ${activeSelection === 'tasks' ? 'active' : ''}`}
          onClick={() => handleSelectionChange('tasks')}
        >
          Tasks
          <span className="red-dot"></span>
        </div>
        <div
          className={`my-projects selection ${activeSelection === 'projects' ? 'active' : ''}`}
          onClick={() => handleSelectionChange('projects')}
        >
          Projects
          <span className="red-dot"></span>
        </div>
        <div
          className={`my-notes selection ${activeSelection === 'notes' ? 'active' : ''}`}
          onClick={() => handleSelectionChange('notes')}
        >
          Notes
          <span className="red-dot"></span>
        </div>
      </div>

      {/* CONTAINER WITH THE FIRST 10 TASKS */}
      <div className="tasks-container">
        <div className="selection-carousel">
          {filteredCategories.map((category, index) => (
            <Link key={category._id} to={`/category/${category._id}`} style={{ textDecoration: 'none' }}>
              <div>
                <div className={`hometask task${index + 1}`}>
                  <div className="taskheader">
                    <img src={checkimage} alt='checkimg' className='checkimage' />

                    {/* CATEGORY TYPE FIRST LETTER CAPITALIZED */}
                    <div>
                      {category.categoryType ? 
                        (category.categoryType.charAt(0).toUpperCase() + category.categoryType.slice(1).toLowerCase()) 
                        : 'Task'}
                    </div>
                  </div>
                  <div className="tasktitle">{category.title}</div>
                  <div className="task-date">{new Date(category.createdAt).toLocaleDateString()}</div>
                </div>
                <div className="task-count">
                  <div className="notification-circle">{category.subcategories.length}</div>
                  <img src={treeicon} alt='treeicon'/>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default HomeScreen;
