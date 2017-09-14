import * as TYPES from '../constants/constants';

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

export function refreshJourneys(destinationId, origin, destination) {
  return async (dispatch, getState, { TRANSIT_API }) => {
    const journeys = await TRANSIT_API.fetchJourneys(origin, destination);

    const journeysOffset = journeys
      .filter((journey) => {
        const currentTimeInSeconds = Date.now() / 1000;
        const diff = journey.departureTimeUTC - currentTimeInSeconds;
        const offset = 1.5;
        return diff >= offset;
      })
      .sort((a, b) => a - b);

    dispatch(removeJourneys(destinationId));
    dispatch(addJourneys(destinationId, journeysOffset));
  };
}

export function fetchJourneys(destinationId, origin, destination) {
  return async (dispatch, getState, { TRANSIT_API }) => {
    const journeys = await TRANSIT_API.fetchJourneys(origin, destination);
    const alerts = await TRANSIT_API.fetchAlerts();

    journeys.forEach((journey) => {
      journey.alerts = [];
      if (!alerts) {
        // if there are no no alerts, say it's on-time
        journey.alerts[0] = 'on-time';
        return;
      }

      // loop through the transit steps looking for potential affected lines
      journey.transitSteps.forEach((transitStep) => {
        // loop through the alert objects
        Object.keys(alerts).forEach((index) => {
          // if there are affected lines for one alert object
          if (alerts[index].affectedLines.length) {
            // check to see if the line in the step...
            const journeyStepLine = transitStep.line;
            // ...is included in the alert
            if (alerts[index].affectedLines.includes(journeyStepLine)) {
              // if it is, push the alert description
              journeys.alerts.push(index.description);
            }
            // if it isn't, do nothing
          }
        });
      });
      // if this journey has no alerts, say that it is on-time
      if (!journey.alerts.length) journey.alerts[0] = 'on-time';
    });

    const journeysOffset = journeys
      .filter((journey) => {
        const currentTimeInSeconds = Date.now() / 1000;
        const diff = journey.departureTimeUTC - currentTimeInSeconds;
        const offset = 1.5;
        return diff >= offset;
      })
      .sort((a, b) => a - b);

    dispatch(removeJourneys(destinationId));
    dispatch(addJourneys(destinationId, journeysOffset));
    dispatch({
      type: TYPES.ALERTS_RETRIEVED,
      alerts,
    });
  };
}
