import React, { useState, useEffect } from "react";
import { getCurrentMonth, getLastDay, convertDate } from "./datefunction/index";
import "./App.css";
import AppHeader from "./components/appheader";
import TimeTable from "./components/timetable";
import { readClients, readTrains } from "./api/index";
import Loading from "./components/loading";
import { usePopper } from 'react-popper';
import TrainCard from "./components/traincard";

export const PopperContext = React.createContext();

function App() {
  const [date, setDate] = useState(getCurrentMonth());
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [trains, setTrains] = useState([]);
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const [isCardVisible, setIsCardVisible] = useState(false);
  const [datacard, setData] = useState([]);


  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom',
    modifiers: [
      {
        name: 'preventOverflow',
        options: {
          // Ограничивает позиционирование Popper, чтобы он не выходил за границы видимой области
          boundary: 'viewport',
        },
      },
      {
        name: 'flip',
        options: {
          // Если tooltip выходит за границу, переключает его в противоположное направление
          fallbackPlacements: ['bottom', 'right', 'left'],
        },
      },
    ],
  });

  useEffect(() => {
    readClients().then((data) => {
      setClients(data);
    });
    readTrains(convertDate(date)).then((data) => {
      setTrains(data);
    });
    Promise.all([readClients, readTrains]).then(setLoading(true));
  }, [date]);

  const clickHandler = (event) => {
    if (!event.target.classList.contains("cell")) { return; }
    let target = event.target.closest(".cell");
    let cssClass = target.classList.length === 1 ? "box" : target.classList[target.classList.length - 1];
    const client = target.parentElement.cells[0].textContent;
    const data = {
      time: target.textContent,
      type: cssClass,
      clientID: target.dataset.clientid,
      date: date.split("-").reverse().join("_"),
      day: target.dataset.day,
      clientName: client,
    }
    setData(data);
    setIsCardVisible(true)
  }

  const closeCardHandler = () => setIsCardVisible(false);

  return (
    <PopperContext.Provider value={ setReferenceElement }>
      <div className="App"  onClick={ clickHandler }>
        {isCardVisible && (
            <div ref={setPopperElement} className="popper" style={{ ...styles.popper, ...styles.offset, zIndex:100 }} {...attributes.popper}>
                <TrainCard
                  data={datacard}
                  loadTrains={setTrains}
                  closeCardHandler={closeCardHandler}
                />
            </div>
        )}
        <AppHeader currentMonth={date} dateHandler={setDate}/>
        {loading ? (
          <TimeTable
            range={[1, 17]}
            trains={trains}
            date={date}
            loadTrains={setTrains}
            loadclient={setClients}
            clients={clients}
          />
        ) : (
          Loading({ type: "bars", color: "#6a98ff" })
        )}
        {loading ? (
          <TimeTable
            range={[18, getLastDay(date)]}
            date={date}
            trains={trains}
            loadTrains={setTrains}
            loadclient={setClients}
            clients={clients}
          />
        ) : (
          Loading({ type: "bars", color: "#6a98ff" })
        )}
      </div>
    </PopperContext.Provider>
  );
}

export default App;
