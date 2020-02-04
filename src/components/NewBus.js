import React, { useContext } from 'react';
import { BusScheduleContext } from '../BusScheduleStateProvider';
import { CREATE_BUS } from '../BusScheduleReducer';
import { nextBusId } from '../helpers/modify-schedules';

const NewBus = () => {
  const { state, dispatch } = useContext(BusScheduleContext);

  const handleAddTrip = () => {
    const newBusId = nextBusId(state.busses)
    dispatch({type: CREATE_BUS, payload: { busId: newBusId }});
  };

  return (
    <div className='bus' onClick={handleAddTrip}>
      <b>New Bus</b>
    </div>
  );
}

export default NewBus;
