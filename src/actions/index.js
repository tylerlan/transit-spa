import * as TYPES from '../constants/constants';

export function updateCurrentLocation(location) {
  return {
    type: TYPES.UPDATE_CURRENT_LOCATION,
    currentLocation: location,
  };
}

export function addDestination(dest) {
  return {
    type: TYPES.ADD_DESTINATION,
    destination: dest,
  };
}

export function addJourneys(destinationId, journeys) {
  return {
    type: TYPES.ADD_JOURNEYS,
    destinationId,
    journeys,
  };
}

export function removeJourney(destinationId, index) {
  return {
    type: TYPES.REMOVE_JOURNEY,
    destinationId,
    index,
  };
}

export function removeDestination(destinationId) {
  return {
    type: TYPES.REMOVE_DESTINATION,
    destinationId,
  };
}

export function fetchJourneys(destinationId, origin, destination, time) {
  return async (dispatch, getState, { Api }) => {
    const json = await Api.fetchJourneys(origin, destination, time);
    return dispatch(addJourneys(destinationId, json.body));
  };
}
