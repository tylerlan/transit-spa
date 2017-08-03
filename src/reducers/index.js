import { combineReducers } from 'redux';
import * as TYPES from '../constants/constants';

export function configuration(state = { currentLocation: {} }, action) {
  switch (action.type) {
    case TYPES.UPDATE_CURRENT_LOCATION:
      return {
        currentLocation: { ...state.currentLocation, ...action.currentLocation },
      };

    default:
      return state;
  }
}

export function destinations(state = { ids: [], byId: {} }, action) {
  const newDestinationsById = {};
  let destinationsIdsToKeep = [];
  switch (action.type) {
    case TYPES.ADD_DESTINATION:
      newDestinationsById[action.destination.id] = { ...action.destination };
      return {
        ids: [...state.ids, action.destination.id],
        byId: { ...state.byId, ...newDestinationsById },
      };

    case TYPES.REMOVE_DESTINATION:
      destinationsIdsToKeep = state.ids.filter(id => id !== action.destinationId);
      return {
        ids: [...destinationsIdsToKeep],
        byId: { ...state.byId },
      };

    default:
      return state;
  }
}

export function journeys(state = { byDestinationId: {} }, action) {
  const dId = action.destinationId;
  let journeysForDest;
  const newJourneysByDestinationId = {};
  let journeysToKeep = [];
  switch (action.type) {
    case TYPES.ADD_JOURNEYS:
      if (state.byDestinationId[dId]) {
        journeysForDest = [...state.byDestinationId[dId], ...action.journeys];
      } else {
        journeysForDest = action.journeys;
      }
      newJourneysByDestinationId[dId] = journeysForDest;
      return {
        byDestinationId: { ...state.byDestinationId, ...newJourneysByDestinationId },
      };

    case TYPES.REMOVE_JOURNEY:
      journeysToKeep = state.byDestinationId[dId].filter((journey, ix) => ix !== action.index);
      newJourneysByDestinationId[dId] = journeysToKeep;
      return {
        byDestinationId: { ...state.byDestinationId, ...newJourneysByDestinationId },
      };

    default:
      return state;
  }
}

export default combineReducers({
  configuration,
  destinations,
  journeys,
});
