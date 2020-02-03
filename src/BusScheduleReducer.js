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
        let foundTrip = undefined;
        const updatedBusses = busses.map(bus => {
          const filteredTrips = bus.trips.filter(trip => {
            if (trip.id === selectedTripId) {
              foundTrip = trip;
              return false;
            }
            return true;
          });
          bus.trips = filteredTrips;
          return bus;
        });
        updatedBusses[busId].trips.push(foundTrip);
        return { ...state, busses: updatedBusses };
      }
      return state;
    }
    default:
      return state;
  }
}

export default busScheduleReducer;
