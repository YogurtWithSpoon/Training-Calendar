import React from 'react';

const AppHeader = (props) => {
  return(
    <div className="app_header">
      <div className="date_container">
        <label htmlFor="select_date">Расписание на</label>
        <input 
          type="month" 
          name="select_date" 
          onChange={(event) => {props.dateHandler(event.target.value)}}
          defaultValue={props.currentMonth} 
          className="select_date"/>
      </div>
      <div className="legend_container">
        <div className="legend">
          <div className="circle solo"></div>
          <div>индивидуальная</div>
        </div>
        <div className="legend">
          <div className="circle box"></div>
          <div>бокс</div>
        </div>
        <div className="legend">
          <div className="circle group"></div>
          <div>групповая</div>
        </div>
        <div className="legend">
          <div className="circle split"></div>
          <div>сплит</div>
        </div>
      </div>
    </div>
  )
}

export default AppHeader;