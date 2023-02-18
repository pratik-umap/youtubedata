import React from 'react'

function Pagination({ itemsPerPage, totalItems, currentPage, onPageChange }) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
  
    const handleClick = (pageNumber) => {
      if (pageNumber >= 1 && pageNumber <= totalPages) {
        onPageChange(pageNumber);
      }
    };
    return (
        <div className='pagination'>
        <button onClick={() => handleClick(currentPage - 1)}>Previous</button>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handleClick(pageNumber)}
              disabled={pageNumber === currentPage}
            >
              {pageNumber}
            </button>
          )
        )}
        <button onClick={() => handleClick(currentPage + 1)}>Next</button>
      </div>
  )
}

export default Pagination