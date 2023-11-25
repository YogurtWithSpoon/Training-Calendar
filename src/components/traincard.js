import React, { useState } from "react";
import { writeTrain, deleteTrain, readTrains } from "../api/index";
const TrainCard = ({hide, data, loadTrains, closeCardHandler}) => {
  const [time, setTime] = useState(data.time);
  const [type, setType] = useState(data.type);

  return (
    <div className="card" >
      <div className="info_container">
        <button className="close" onClick={ closeCardHandler }>
          <i className="fas fa-times"></i>
        </button>
        <span className="card_info">{data.clientName}  {data.day} число</span>
        <label htmlFor="timetrain">Время тренировки</label>
        <input
          type="time"
          name="timetrain"
          required
          onChange={(event) => {
            setTime(event.target.value);
          }}
          defaultValue={data.time}
        />
        <label htmlFor="type">Тип тренировки</label>
        <select
          name="type"
          onChange={(event) => {
            setType(event.target.value);
          }}
          value={type}
        >
          <option value="box">Бокс</option>
          <option value="solo">Индивидуальная</option>
          <option value="group">Групповая</option>
        </select>
      </div>
      <div className="button_container">
        <button
          className="add"
          onClick={() => {
            if(time === ""){
              alert("Укажите данные")
              return ;
            }
            writeTrain(data.date, data.day, time, type, data.clientID);
            closeCardHandler();
            readTrains(data.date).then(data => {
              loadTrains(data)
            });
          }}
        >
          Добавить
        </button>
        <button
          className="remove"
          onClick={() => {
            deleteTrain(data.date, data.day, data.clientID);
            readTrains(data.date).then(data => {
              loadTrains(data)
            });
          }}
        >
          Очистить
        </button>
      </div>
    </div>
  );
};

export default TrainCard;
