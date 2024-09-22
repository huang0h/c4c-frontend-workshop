import React from 'react';

const SearchBar = ({ onSearch }) => {
  return (
    <input 
      type="text" 
      onChange={(e) => onSearch(e.target.value)} 
      placeholder="Search by title..." 
      className="search-bar"
    />
  );
};

export default SearchBar;