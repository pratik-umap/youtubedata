import React from 'react'

function ItemList({ items ,columns,sortItems}) {
  return (
      <tbody>
        {sortItems(items).map((item,key)=>(
                <tr key={key}>
                    {columns.map((column ,key)=>(
                        <td key={key} className="users-table-cell">{item[column]}</td>
                    ))}
                </tr>
            ))}
      </tbody>
  )
}

export default ItemList