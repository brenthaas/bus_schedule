import React from 'react';
import logo from './logo.svg';
import './App.css';

import schedules from './bus-scheduling-input.json'
import { BusScheduleStateProvider } from './BusScheduleStateProvider'
import BusSchedule from './components/BusSchedule'

function App() {
  const initialState = {
    busses: schedules.map((schedule, index) => (
      { id: index, trips: [schedule] }
    )),
    selectedTrip: undefined
  };

  return (
    <BusScheduleStateProvider initialState={initialState}>
      <div className="BusScheduleApp">
        <BusSchedule/>
      </div>
    </BusScheduleStateProvider>
  );
}

export default App;
