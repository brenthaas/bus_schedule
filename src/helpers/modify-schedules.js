import { formatTimestamp } from './time-helpers'

export const moveTripToBus = (bus, tripId, busses) => {
  let foundTrip = findTrip(tripId, busses);
  if (foundTrip) {
    if (hasSchedulingConflict(foundTrip, bus.trips)) {
      alert(
        `Schedule Conflict: Trip ${tripId} can not be added to bus ${bus.id}`
      );
      return busses;
    } else {
      const updatedBusses = removeTrip(foundTrip, busses);
      bus.trips.push(foundTrip);
      return cleanupEmptyBusses(updatedBusses);
    }
  }
};

export const nextBusId = busses => {
  return Math.max(...busses.map(bus => bus.id)) + 1;
};

const cleanupEmptyBusses = busses => {
  return busses.filter(bus => bus.trips.length > 0)
};

export const busScheduleRange = bus => {
  const scheduleStartTime = Math.min(...bus.trips.map(trip => trip.startTime));
  const scheduleEndTime = Math.max(...bus.trips.map(trip => trip.endTime));
  return `${formatTimestamp(scheduleStartTime)} - ${formatTimestamp(scheduleEndTime)}`
};

const findTrip = (tripId, busses) => {
  for (const bus of busses) {
    for (const trip of bus.trips) {
      if (trip.id === tripId) { return trip }
    }
  }
};

const hasSchedulingConflict = (trip, schedule) => {
  return schedule.find(scheduledTrip => {
    if(scheduledTrip.id === trip.id) {
      return false
    } else {
      return schedulesOverlap(trip, scheduledTrip)
    };
  });
};

const removeTrip = (tripToRemove, busses) => {
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
    (trip1.endTime > trip2.startTime && trip1.endTime <= trip2.endTime)
  )
}
