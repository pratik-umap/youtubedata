import React, { useState } from 'react'

function SearchBar({ onSearch }) {

   const [searchTerm, setSearchTerm] = useState("");
  
    const handleSearch = () => {
      onSearch(searchTerm);
    };
    return (
     <div className='search_bar'>
        <input
          type="text"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          className="search_input"
        />
        <button className='search_btn' onClick={handleSearch}>Search</button>
      </div>
  )
}

export default SearchBar