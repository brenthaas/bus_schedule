import React, { useContext } from 'react';
import { BusScheduleContext } from '../BusScheduleStateProvider';
import Bus from './Bus';
import NewBus from './NewBus';

const BusSchedule = () => {
  const { state } = useContext(BusScheduleContext);

  if (state) {
    return (
      <div className='bus-schedule'>
        <div>Bus Schedule:</div>
        <hr/>
        { state.busses.map(bus => <Bus bus={bus} key={`BUS-${bus.id}`}/> )}
        { state.selectedTripId ? <NewBus/> : '' }
      </div>
    )
  }

  return <div>No Busses Loaded</div>;
};

export default BusSchedule;
