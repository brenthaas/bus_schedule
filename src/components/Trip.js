import React, { useContext } from 'react'
import { BusScheduleContext } from '../BusScheduleStateProvider';

const Trip = (trip) => {
  if (trip) {
    return (
      <div className={'trip' + (trip.selected ? ' selected' : '')}
           style={{ width: `${trip.duration}px`, left: `${trip.startTime}px` }}
           onClick={() => trip.onClick(trip.id)}
      >
        {trip.id}
      </div>
    )
  }

  return <div>Trip not Found!</div>;
};

export default Trip;
