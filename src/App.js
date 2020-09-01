import React,{useState,useEffect} from 'react';
import {getCurrentMonth,getLastDay,convertDate} from './datefunction/index'
import './App.css';
import AppHeader from './components/appheader'
import TimeTable from './components/timetable'
import {readClients, readTrains} from './api/index'


function App() {

  const [date, setDate] = useState(getCurrentMonth());
  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(false);
  const [trains, setTrains] = useState([])



  useEffect(() => {
    readClients().then(data => {
      setClients(data)
    })
    readTrains(convertDate(date)).then(data => {
      setTrains(data)
    })
    Promise.all([readClients,readTrains]).then(setLoading(true));
  },[date])
    
  return (
    <div className="App">
      <AppHeader currentMonth={date} dateHandler={setDate}/>
      {loading ? <TimeTable range={[1,17]} trains={trains} date={date} loadTrains={setTrains} loadclient={setClients} clients={clients}/> : "Loading"}
      {loading ? <TimeTable range={[18,getLastDay(date)]} date={date} trains={trains} loadTrains={setTrains}  loadclient={setClients} clients={clients}/> : "Loading"}
    </div>
  );
}

export default App;
