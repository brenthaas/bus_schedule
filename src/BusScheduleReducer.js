export const SELECT_TRIP = "SELECT_TRIP";

const busScheduleReducer = (state, { type, payload }) => {
  switch (type) {
    case SELECT_TRIP: {
      const selected = (payload == state.selectedTrip ? undefined : payload)
      return { ...state, selectedTrip: selected };
    }
    default:
      return state;
  }
}

export default busScheduleReducer;
