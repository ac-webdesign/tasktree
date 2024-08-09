import React, { useState } from 'react';
import searchicon from '../images/search-line.png'


function SearchBar({ handleSearch }) {
  const [query, setQuery] = useState('');
  
  const handleInputChange = (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    handleSearch(newQuery);
  };
  
  return (
    <div className='search'>
      <input className='search-bar'
        type="text" 
        placeholder="Search" 
        value={query} 
        onChange={handleInputChange} 
      />
      <img src={searchicon} alt='searchicon'/>
    </div>
  );
}

export default SearchBar;
