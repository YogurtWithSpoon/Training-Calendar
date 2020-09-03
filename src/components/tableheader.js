import React from "react";

const TableHeader = (props) => {
  let today = new Date().getDate() - 1;

  const rowGenerator = (start, end) => {
    const days = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];
    const month = Number(props.date.split("-")[1]) -1;
    const year = props.date.split("-")[0];
    let checkMonth = Boolean(month === new Date().getMonth());
    let array = [];
    for (let i = start; i <= end; i++) {
      let date = new Date(year,month,i-1).getDay()
      let day = days[date]
      let classElem;
      if(checkMonth){
        classElem = i-1 === today ? "days_cell current" : "days_cell"
      } else{
        classElem = "days_cell"
      }
      array.push(
        <td className={classElem} key={i}>
          {`${i} \n ${day}`}
        </td>
      );
    }
    return array;
  };

  const [start, end] = props.range;
  return (
    <thead>
      <tr className="days">
        <td>Имя</td>
        {rowGenerator(start, end).map((item) => item)}
      </tr>
    </thead>
  );
};

export default TableHeader;
