import React from 'react';

const TableHeader = (props) => {

  const rowGenerator = (start,end) => {
    let array = []
    for(let i = start; i <= end; i++){
    array.push(<td className="days_cell" key={i}>{i}</td>)
    }
    return array;
  }

  const [start,end] = props.range
  return(
    <thead>
      <tr className="days">
        <td>Имя</td>
        {rowGenerator(start,end).map(item => item)}
      </tr>
    </thead>
  )
}

export default TableHeader;