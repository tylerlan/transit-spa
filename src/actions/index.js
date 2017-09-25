import * as TYPES from '../constants/constants';
import * as HELPERS from '../utils/apiHelpers';

export function updateCurrentLocation() {
  return async (dispatch, getState, { TRANSIT_API }) => {
    dispatch({
      type: TYPES.GEOLOCATING,
    });

    const location = await TRANSIT_API.getCurrentLocation();

    return dispatch({
      type: TYPES.UPDATE_CURRENT_LOCATION,
      currentLocation: location,
    });
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

export function removeJourneys(destinationId) {
  return {
    type: TYPES.REMOVE_JOURNEYS,
    destinationId,
  };
}

export function removeDestination(destinationId) {
  return {
    type: TYPES.REMOVE_DESTINATION,
    destinationId,
  };
}

export function fetchJourneys(destinationId, origin, destination) {
  return async (dispatch, getState, { TRANSIT_API }) => {
    // NOTE: json also includes fare{}, bounds{}, and polyline{}--not being used
    const json = await TRANSIT_API.fetchJourneys(origin, destination);
    const alerts = await TRANSIT_API.fetchAlerts();

    const journeys = await HELPERS.createArrayOfJourneyObjects(json);
    const journeysWithAlerts = await HELPERS.applyAlerts(journeys, alerts);
    const journeysOffset = await HELPERS.offsetJourneys(journeysWithAlerts);

    const currentJourneysForDestination = getState().widgets.byId.transit.journeys.byDestinationId[
      destinationId
    ];

    if (currentJourneysForDestination) {
      dispatch(removeJourneys(destinationId));
    }

    dispatch(addJourneys(destinationId, journeysOffset));
    dispatch({
      type: TYPES.ALERTS_RETRIEVED,
      alerts,
    });
  };
}
