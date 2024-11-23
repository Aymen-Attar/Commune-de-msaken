import React, { useState } from "react";
import { render } from "react-dom";
import Calendar from "react-calendar";
import "./Calendar.css";
import 'react-calendar/dist/Calendar.css';

function ReactCalendar() {
  const [date, setDate] = useState(new Date());

  const onChange = (date) => {
    setDate(date);
  };

  return (
    <div className="calendar-wrapper">
      <Calendar  onChange={onChange} value={date} locale="fr-FR"/>
    </div>
  );
}

export default ReactCalendar;
