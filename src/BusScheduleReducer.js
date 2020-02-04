import {
  cleanupEmptyBusses,
  findTrip,
  hasSchedulingConflict,
  removeTrip
} from './helpers/modify-schedules'

export const SELECT_TRIP = "SELECT_TRIP";
export const SELECT_BUS = "SELECT_BUS";

const busScheduleReducer = (state, { type, payload }) => {
  switch (type) {
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

        let foundTrip = findTrip(selectedTripId, busses);
        if (foundTrip) {
          if (hasSchedulingConflict(foundTrip, selectedBus.trips)) {
            alert(
              `Schedule Conflict: Trip ${selectedTripId} can not be added to bus ${selectedBus.id}`
            );
          } else {
            const updatedBusses = removeTrip(foundTrip, busses);
            selectedBus.trips.push(foundTrip);
            const filteredBusses = cleanupEmptyBusses(updatedBusses);
            return {
              ...state,
              busses: filteredBusses,
              selectedBus: undefined,
              selectedTripId: undefined
            };
          }
        }
      }
      return state;
    }
    default:
      return state;
  }
}

export default busScheduleReducer;
