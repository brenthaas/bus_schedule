export const cleanupEmptyBusses = busses => {
  return busses.filter(bus => bus.trips.length > 0)
};

export const findTrip = (tripId, busses) => {
  for (const bus of busses) {
    for (const trip of bus.trips) {
      if (trip.id === tripId) { return trip }
    }
  }
};

export const hasSchedulingConflict = (trip, schedule) => {
  return schedule.find(scheduledTrip => {
    if(scheduledTrip.id === trip.id) {
      return false
    } else {
      return schedulesOverlap(trip, scheduledTrip)
    };
  });
};

export const removeTrip = (tripToRemove, busses) => {
  return busses.map(bus => {
    const filteredTrips = bus.trips.filter(trip => {
      if (trip === tripToRemove) {
        return false;
      }
      return true;
    });
    bus.trips = filteredTrips;
    return bus;
  });
};

const schedulesOverlap = (trip1, trip2) => {
  return (
    (trip1.startTime >= trip2.startTime && trip1.startTime < trip2.endTime) ||
    (trip1.endTime >= trip2.startTime && trip1.endTime < trip2.endTime)
  ) || (
    (trip2.startTime >= trip1.startTime && trip2.startTime < trip1.endTime) ||
    (trip2.endTime >= trip1.startTime && trip2.endTime < trip1.endTime)
  )
}
