import React, { useContext } from 'react';
import { BusScheduleContext } from '../BusScheduleStateProvider';
import { SELECT_TRIP } from '../BusScheduleReducer';

const Trip = ({id, onClick, selected, startTime, duration}) => {
  const { dispatch } = useContext(BusScheduleContext);

  const handleTripSelection = id => {
    dispatch({type: SELECT_TRIP, payload: { tripId: id }});
  };

  return (
    <div className={'trip' + (selected ? ' selected' : '')}
         key={'trip' + id}
         style={{ width: `${duration}px`, left: `${startTime}px` }}
         onClick={(event) => {
           handleTripSelection(id);
           event.stopPropagation();
         }}
    >
      {id}
    </div>
  )
};

export default Trip;
