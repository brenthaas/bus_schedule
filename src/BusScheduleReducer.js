import { moveTripToBus } from './helpers/modify-schedules'

export const CREATE_BUS = "CREATE_BUS";
export const SELECT_TRIP = "SELECT_TRIP";
export const SELECT_BUS = "SELECT_BUS";

const busScheduleReducer = (state, { type, payload }) => {
  switch (type) {
    case CREATE_BUS: {
      const { busId } = { ...payload };
      const newBus = {id: busId, trips: []};
      const newBusses = [ ...state.busses, newBus ];
      const updatedBusses = moveTripToBus(newBus, state.selectedTripId, newBusses);
      return {
        ...state,
        busses: updatedBusses,
        selectedBus: undefined,
        selectedTripId: undefined
      };
    }
    case SELECT_TRIP: {
      const { tripId } = { ...payload }
      const selectedTripId = (tripId === state.selectedTripId ? undefined : tripId);
      return { ...state, selectedTripId: selectedTripId };
    }
    case SELECT_BUS: {
      const { busses, selectedTripId } = { ...state };
      const { busId } = { ...payload };

      if (selectedTripId) {
        const selectedBus = busses.find(bus => bus.id === busId)
        const filteredBusses = moveTripToBus(selectedBus, selectedTripId, busses);
        return {
          ...state,
          busses: filteredBusses,
          selectedBus: undefined,
          selectedTripId: undefined
        };
      }
      return state;
    }
    default:
      return state;
  }
}

export default busScheduleReducer;
