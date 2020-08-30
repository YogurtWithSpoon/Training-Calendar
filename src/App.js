import React from 'react';
import './App.css';
import {readClients,readTrains,writeClient,writeTrain,deleteTrain,deleteClient} from './api/index'

function App() {
  //read data about clients
    // readClients().then(data => {console.log(data)})
  //read data about trains in monts_year sent in argument
    // readTrains("09_2020").then(data => {console.log(data)})
  // write new user to base arguments "id and name"
    // writeClient("10","Petr")
  // delete Client only clientId
    // deleteClient(10)
  // write new train to base
    // writeTrain("09_2020","10","15:30","box","2");
  // delete train (date,day,time)
    // deleteTrain("09_2020","10","15:30")
  return (
    <div className="App">
      <div>Hello</div>
    </div>
  );
}

export default App;
