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
    const json = await TRANSIT_API.fetchJourneys(origin, destination);
    const alerts = await TRANSIT_API.fetchAlerts();
    const journeys = json.map((rawJourneyObj) => {
      const journeyObj = {
        destination: rawJourneyObj.legs[0].end_address,
        arrivalTimeText: rawJourneyObj.legs[0].arrival_time.text,
        departureTimeUTC: rawJourneyObj.legs[0].departure_time.value,
        transitSteps: rawJourneyObj.legs[0].steps.map((step) => {
          const line = step.transit_details ? step.transit_details.line.short_name : 'N/A';
          const vehicle = step.transit_details ? step.transit_details.line.vehicle.name : 'N/A';
          const stepObj = {
            instruction: step.html_instructions,
            mode: step.travel_mode,
            duration: step.duration.text,
            line,
            vehicle,
            shortName: step.transit_details ? step.transit_details.line.short_name : '',
            agency: step.transit_details ? step.transit_details.line.agencies[0].name : '',
          };
          return stepObj;
        }),
      };
      Object.keys(journeyObj.transitSteps).forEach((transitStep) => {
        if (journeyObj.transitSteps[transitStep]) {
          Object.keys(alerts).forEach((alert) => {
            if (alerts[alert].affectedLines) {
              journeyObj.alerts = [];
              alerts[alert].affectedLines.forEach((line) => {
                const jrnyStpsLne = journeyObj.transitSteps[transitStep].line;
                if (jrnyStpsLne === parseInt(line, 10)) journeyObj.alerts.push(alert.description);
              });
              if (!journeyObj.alerts[0]) journeyObj.alerts[0] = 'on-time';
            }
          });
        }
      });
      return journeyObj;
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
  };
}

export function fetchJourneys(destinationId, origin, destination) {
  return async (dispatch, getState, { TRANSIT_API }) => {
    const json = await TRANSIT_API.fetchJourneys(origin, destination);
    const alerts = await TRANSIT_API.fetchAlerts();
    const journeys = json.map((rawJourneyObj) => {
      const journeyObj = {
        destination: rawJourneyObj.legs[0].end_address,
        arrivalTimeText: rawJourneyObj.legs[0].arrival_time.text,
        departureTimeUTC: rawJourneyObj.legs[0].departure_time.value,
        transitSteps: rawJourneyObj.legs[0].steps.map((step) => {
          const line = step.transit_details ? step.transit_details.line.short_name : 'N/A';
          const vehicle = step.transit_details ? step.transit_details.line.vehicle.name : 'N/A';
          const stepObj = {
            instruction: step.html_instructions,
            mode: step.travel_mode,
            duration: step.duration.text,
            line,
            vehicle,
            shortName: step.transit_details ? step.transit_details.line.short_name : '',
            agency: step.transit_details ? step.transit_details.line.agencies[0].name : '',
          };
          return stepObj;
        }),
      };
      Object.keys(journeyObj.transitSteps).forEach((transitStep) => {
        if (journeyObj.transitSteps[transitStep]) {
          Object.keys(alerts).forEach((alert) => {
            if (alerts[alert].affectedLines) {
              journeyObj.alerts = [];
              alerts[alert].affectedLines.forEach((line) => {
                const jrnyStpsLne = journeyObj.transitSteps[transitStep].line;
                if (jrnyStpsLne === parseInt(line, 10)) journeyObj.alerts.push(alert.description);
              });
              if (!journeyObj.alerts[0]) journeyObj.alerts[0] = 'on-time';
            }
          });
        }
      });
      return journeyObj;
    });
    dispatch(addJourneys(destinationId, journeys));
    dispatch({
      type: TYPES.ALERTS_RETRIEVED,
      alerts,
    });
  };
}
