import React, { useContext } from 'react';
import { BusScheduleContext } from '../BusScheduleStateProvider';
import { SELECT_TRIP } from '../BusScheduleReducer';
import Trip from './Trip';

const BusSchedule = () => {
  const { state, dispatch } = useContext(BusScheduleContext);

  const selectTrip = tripId => {
    dispatch({type: SELECT_TRIP, payload: tripId});
  };

  if (state) {
    return (
      <div className='bus-schedule'>
        <div>Busses Schedule:</div>
        { state.busses.map(bus => (
            <div className='bus'>
              {bus.trips.map(trip => (
                <div key={trip.id}>
                  <Trip
                    id={trip.id}
                    onClick={selectTrip}
                    selected={state.selectedTrip == trip.id}
                    startTime={trip.startTime}
                    duration={trip.endTime - trip.startTime}
                  />
                </div>
              ))}
            </div>
        ))}
      </div>
    )
  }

  return <div>No Busses Loaded</div>;
};

export default BusSchedule;
