import React, { useContext,  useState } from "react";
import { writeClient, readClients, deleteClient } from "../api/index";
import { PopperContext } from '../App'

const TableBody = (props) => {
  const [name, setName] = useState("");
  const [isNewClient, setNewClient] = useState(false);
  const [delClient, setDelete] = useState(false);
  const setCardRef  = useContext(PopperContext);

  const daysGenerator = (id, trains, range) => {
    let tds = [];
    for (let i = range[0]; i <= range[1]; i++) {
      let td =
        trains === null || trains[i] === null || trains[i] === undefined || trains[i][id] === undefined ? (
          <td data-clientid={id} key={i} data-day={i} className="cell" onClick={ (e) => setCardRef(e.target) } ></td>
        ) : (
          <td
            data-clientid={id}
            key={i}
            data-day={i}
            className={`cell ${trains[i][id].type}`}
            onClick={ (e) => setCardRef(e.target) }
          >
            {trains[i][id].time}
          </td>
        );
      tds.push(td);
    }
    return tds;
  };

  const rowGenerator = (clients) => {
    let elements = [];
    for (let client in clients) {
      elements.push(
        <tr key={client}>
          <td className="client" data-id={client}>
            <div className="client_container">
              <span onDoubleClick={() => 
                setDelete(!delClient)}
              >{clients[client]}</span>
              {delClient && <button
                className="delete animate__animated animate__slideInLeft"
                onClick={(event) => {
                  deleteClient(event.target.closest("td").dataset.id);
                  readClients().then((data) => {
                    props.loadclient(data);
                  });
                  setDelete(false);
                }}
              >
                <i className="fas fa-times"></i>
              </button>}
            </div>
          </td>
          {daysGenerator(client, props.trains, props.range).map((item) => item)}
        </tr>
      );
    }
    return elements;
  };

  return (
    <tbody>
      {rowGenerator(props.clients, props.trains, props.range).map(
        (item) => item
      )}
      <tr>
        <td className="new_client">
          <input
            type="text"
            onChange={(event) => {
              setName(event.target.value);
              if(event.target.value === ""){
                setNewClient(false)
              } else{
                setNewClient(true)
              }
            }}
            value={name}
            placeholder="..."

          />
          {isNewClient && <button
            onClick={() => {
              writeClient(String(Date.now()).slice(7, -1), name);
              setName("");
              readClients().then((data) => {
                props.loadclient(data);
              });
              setNewClient(false)
            }}
            className="animate__animated animate__fadeInUp"
          >
            <i className="fas fa-check"></i>
          </button>
          }
        </td>
      </tr>
    </tbody>
  );
};

export default TableBody;
