import React, { useState } from "react";
import { writeTrain, deleteTrain, readTrains } from "../api/index";
const TrainCard = (props) => {

  const checkPosition = () => {
    if(props.data[7] && props.data[8]){
      return {
        left: `${props.data[4] - 200 - props.data[9]}px`,
        top: `${props.data[3] - (300 - props.data[10] * 2) + props.data[10]}px`
      }
    }
    if(props.data[8]){
      return {
        left: `${props.data[4] - 200 - props.data[9]}px`,
        top: `${props.data[3]}px`
      }
    }
    if(props.data[7]){
      return {
        top: `${props.data[3] - (300 - props.data[10] * 2) + props.data[10]}px`,
        left: `${props.data[4]}px`
      }
    }
    return {
      top: `${props.data[3]}px`,
      left: `${props.data[4]}px`
    }
  }

  const [time, setTime] = useState(props.data[0]);
  const [type, setType] = useState(props.data[1]);

  return (
    <div className="card" style={checkPosition()} >
      <button className="close" onClick={() => props.hide(false)}>
        <i className="fas fa-times"></i>
      </button>
      <span>{props.data[6]} число</span>
      <label htmlFor="timetrain">Время тренировки</label>
      <input
        type="time"
        name="timetrain"
        required
        onChange={(event) => {
          setTime(event.target.value);
        }}
        defaultValue={time}
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
      <button
        className="add"
        onClick={() => {
          if(time === ""){
            alert("Укажите данные")
            return ;
          }
          writeTrain(props.data[5], props.data[6], time, type, props.data[2]);
          props.hide(false);
          readTrains(props.data[5]).then(data => {
            props.loadTrains(data)
          });
        }}
      >
        Добавить
      </button>
      <button
        className="remove"
        onClick={() => {
          deleteTrain(props.data[5], props.data[6], props.data[2]);
          props.hide(false);
          readTrains(props.data[5]).then(data => {
            props.loadTrains(data)
          });
        }}
      >
        Очистить
      </button>
    </div>
  );
};

export default TrainCard;
