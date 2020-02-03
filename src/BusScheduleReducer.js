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
        const updatedBusses = busses.map(bus => {
          if (bus.id === busId) {
            // TODO: add a the trip to this bus
            return bus;
          }
          const filteredTrips = bus.trips.filter(trip => trip.id != selectedTripId);
          bus.trips = filteredTrips;
          return bus;
        });
        return { ...state, busses: updatedBusses };
      }
      return state;
    }
    default:
      return state;
  }
}

export default busScheduleReducer;
