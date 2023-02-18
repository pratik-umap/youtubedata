import React, { useEffect, useState } from 'react'
import './Data.css'
import ItemList from './ItemList';
import Pagination from './Pagination';
import SearchBar from './SearchBar';

function Data() {
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const [sortColumn, setSortColumn] = useState(null);
    const [sortOrder, setSortOrder] = useState("asc");

    const columns=["at","author","like","reply","text"];

    useEffect(()=>{
          
        fetch('https://dev.ylytic.com/ylytic/test')
        .then((res)=>res.json())
        .then((res)=>{
        setItems(res.comments);
        })
        .catch((err)=>{
            throw err;
       })
    },[])

      const handleSearch = (searchTerm) => {
          if (Number.isInteger(searchTerm)) {
        
              const filteredItems3 = items.filter((item) => {
                  return (
                  item.like===(searchTerm) ||
                  item.reply===(searchTerm)
                  )
              });
              setItems(filteredItems3);
          }else{
                const filteredItems1 = items.filter((item) => {
                  return item.at.toLowerCase().includes(searchTerm.toLowerCase())
                });
                const filteredItems2 = items.filter((item) => {
                    return item.author.toLowerCase().includes(searchTerm.toLowerCase())
                });
                
                const filteredItems4 = items.filter((item) => {
                    return item.text.toLowerCase().includes(searchTerm.toLowerCase())
                });
                const data= filteredItems1.length!==0?setItems(filteredItems1):filteredItems2.length!==0?setItems(filteredItems2):filteredItems4.length!==0?setItems(filteredItems4)
                  :"data not found";
          }
          setCurrentPage(1);
      };

    const itemsPerPageOptions = ["select",25, 50, 75, 100];

    const handleItemsPerPageChange = (event) => {
        setItemsPerPage(parseInt(event.target.value));
        setCurrentPage(1);
    };
  
    const itemsPerPageSelect = (
      <select className='dropdown' value={itemsPerPage} onChange={handleItemsPerPageChange}>
        {itemsPerPageOptions.map((option) => (
          <option key={option} value={option}>
            {option} per page
          </option>
        ))}
      </select>
    );
      const sortItems = (items) => {
          if (sortColumn) {
              const sorted = items.sort((a, b) => {
              if (a[sortColumn] < b[sortColumn]) {
                  return sortOrder === "asc" ? -1 : 1;
              }
              if (a[sortColumn] > b[sortColumn]) {
                  return sortOrder === "asc" ? 1 : -1;
              }
              return 0;
              });
              return sorted;
          }
          return items;
      };
    const handleSort = (column) => {
        if (sortColumn === column) {
          setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
          setSortColumn(column);
          setSortOrder("asc");
        }
      };
      const handlePagination = (pageNumber) => {
        setCurrentPage(pageNumber);
      };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);    
 
  return (
     // main component
    <div>
        <h2>Youtube Data</h2>
        <div className='header'>
           <SearchBar onSearch={handleSearch} />

            {itemsPerPageSelect}

        </div>
          <table className='users-table'>
              <thead>
                <tr>
                    {
                        columns.map((column,key)=>(
                          <th className='users-table-cell' onClick={()=>handleSort(column)}>
                            {column}{" "}
                            {sortColumn === column && sortOrder === "asc" && "▲"}
                            {sortColumn === column && sortOrder === "desc" && "▼"}  
                          </th>          
                        ))
                    }
                </tr>
            </thead>
            <ItemList  items={currentItems} columns={columns} sortItems={sortItems}/>

          </table>
            <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={items.length}
            currentPage={currentPage}
            onPageChange={handlePagination}
            />
    </div>
  )
}

export default Data

  