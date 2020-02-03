import React, { useContext } from 'react';
import { BusScheduleContext } from '../BusScheduleStateProvider';
import { SELECT_TRIP, SELECT_BUS } from '../BusScheduleReducer';
import Trip from './Trip';

const BusSchedule = () => {
  const { state, dispatch } = useContext(BusScheduleContext);

  const handleTripSelection = id => {
    dispatch({type: SELECT_TRIP, payload: { tripId: id }});
  };

  const handleBusSelection = id => {
    dispatch({type: SELECT_BUS, payload: { busId: id }});
  };

  if (state) {
    return (
      <div className='bus-schedule'>
        <div>Busses Schedule:</div>
        { state.busses.map(bus => (
            <div className='bus' onClick={() => handleBusSelection(bus.id)} key={'bus' + bus.id}>
              {bus.trips.map(trip => (
                <Trip
                  id={trip.id}
                  busId = {bus.id}
                  onClick={(id) => handleTripSelection(id, bus.id)}
                  selected={state.selectedTripId == trip.id}
                  startTime={trip.startTime}
                  duration={trip.endTime - trip.startTime}
                />
              ))}
            </div>
        ))}
      </div>
    )
  }

  return <div>No Busses Loaded</div>;
};

export default BusSchedule;
