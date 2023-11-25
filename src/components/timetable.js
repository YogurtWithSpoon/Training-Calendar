import React from "react";
import TableHeader from "./tableheader";
import TableBody from "./tablebody";

const TimeTable = (props) => {
  return (
    <React.Fragment>
      <div className="calendar_container">
        <table
          className="calendar"
        >
          <TableHeader range={props.range} date={props.date}  loadclient={props.loadclient} />
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
