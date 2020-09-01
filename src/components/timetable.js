import React, { useState } from "react";
import TableHeader from "./tableheader";
import TableBody from "./tablebody";
import TrainCard from "./traincard";
const TimeTable = (props) => {
  const [show, setShow] = useState(false);
  const [datacard, setData] = useState([]);

  return (
    <React.Fragment>
      {show && (
        <TrainCard
          data={datacard}
          hide={setShow}
          loadTrains={props.loadTrains}
        />
      )}
      <div className="calendar_container">
        <table
          className="calendar"
          onClick={(event) => {
            if (event.target.classList.contains("cell")) {
              setShow(true);
              let target = event.target.closest(".cell");
              let coords = target.getBoundingClientRect();
              let isHeight = coords.bottom + 300 >= document.documentElement.clientHeight  ;
              let isWidth = coords.right + 200 >= document.documentElement.clientWidth 
              let right = coords.right;
              let bottom = coords.bottom;
              let width = coords.width;
              let height = coords.height;
              let cssClass = target.classList.length === 1 ? "box" : target.classList[target.classList.length - 1];
              let data = [
                target.textContent,
                cssClass,
                target.dataset.clientid,
                bottom,
                right,
                props.date.split("-").reverse().join("_"),
                target.dataset.day,
                isHeight,
                isWidth,
                width,
                height,
              ];
              setData(data);
            }
            if(show && !event.target.classList.contains('card')){
              setShow(false);
            }
          }}
        >
          <TableHeader range={props.range} loadclient={props.loadclient} />
          <TableBody
            clients={props.clients}
            range={props.range}
            trains={props.trains}
            loadclient={props.loadclient}
          />
        </table>
      </div>
    </React.Fragment>
  );
};

export default TimeTable;
