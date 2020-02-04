import React, { useContext } from 'react';
import { BusScheduleContext } from '../BusScheduleStateProvider';
import { SELECT_BUS } from '../BusScheduleReducer';
import Trip from './Trip';
import { busScheduleRange } from '../helpers/modify-schedules';

const Bus = ({bus}) => {
  const { state, dispatch } = useContext(BusScheduleContext);

  const handleBusSelection = () => {
    dispatch({type: SELECT_BUS, payload: { busId: bus.id }});
  };

  return (
    <div className='bus' onClick={handleBusSelection}>
      <b>Bus {bus.id}</b> &nbsp; &nbsp; {busScheduleRange(bus)}
      <div className='bus-trips'>
        {bus.trips.map(trip => (
          <Trip
            key={`trip-${trip.id}`}
            id={trip.id}
            busId = {bus.id}
            selected={state.selectedTripId === trip.id}
            startTime={trip.startTime}
            duration={trip.endTime - trip.startTime}
          />
        ))}
      </div>
    </div>
  );
}

export default Bus;
