import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as TYPES from '../constants/constants';
import * as actions from './index';

describe('actions', () => {
  it('should create an action to update current location', () => {
    const location = {
      name: 'Galvanize',
      address: '44 Tehama St, San Francisco, CA 94105',
    };

    const expectedAction = {
      type: TYPES.UPDATE_CURRENT_LOCATION,
      currentLocation: {
        name: 'Galvanize',
        address: '44 Tehama St, San Francisco, CA 94105',
      },
    };

    expect(actions.updateCurrentLocation(location)).toEqual(expectedAction);
  });

  it('should create an action to add a destination', () => {
    const destination = {
      id: 5,
      name: 'SFO',
      address: 'SFO, San Francisco, CA 94128',
    };

    const expectedAction = {
      type: TYPES.ADD_DESTINATION,
      destination: {
        id: 5,
        name: 'SFO',
        address: 'SFO, San Francisco, CA 94128',
      },
    };

    expect(actions.addDestination(destination)).toEqual(expectedAction);
  });

  it('should create an action to add journeys for a destination', () => {
    const destinationId = 5;
    const journeys = [
      { departureTime: '07:50am', arrivalTime: '08:30am' },
      { departureTime: '08:00am', arrivalTime: '08:40am' },
      { departureTime: '08:10am', arrivalTime: '08:50am' },
    ];

    const expectedAction = {
      type: TYPES.ADD_JOURNEYS,
      destinationId: 5,
      journeys: [
        { departureTime: '07:50am', arrivalTime: '08:30am' },
        { departureTime: '08:00am', arrivalTime: '08:40am' },
        { departureTime: '08:10am', arrivalTime: '08:50am' },
      ],
    };

    expect(actions.addJourneys(destinationId, journeys)).toEqual(expectedAction);
  });

  it('should create an action to remove a journey for a destination', () => {
    const destinationId = 5;
    const index = 0;

    const expectedAction = {
      type: TYPES.REMOVE_JOURNEY,
      destinationId: 5,
      index: 0,
    };

    expect(actions.removeJourney(destinationId, index)).toEqual(expectedAction);
  });

  it('should create an action to remove a destination', () => {
    const destinationId = 5;

    const expectedAction = {
      type: TYPES.REMOVE_DESTINATION,
      destinationId: 5,
    };

    expect(actions.removeDestination(destinationId)).toEqual(expectedAction);
  });

  it('should fetch journeys from API', () => {
    const mockApiFetchJourneys = jest.fn();
    mockApiFetchJourneys.mockReturnValue(
      Promise.resolve({
        body: [
          { departureTime: '11:50pm', arrivalTime: '12:30am' },
          { departureTime: '11:55pm', arrivalTime: '12:45am' },
        ],
      }),
    );

    const extraArgument = {
      Api: {
        fetchJourneys: mockApiFetchJourneys,
      },
    };

    const initialState = {
      configuration: {
        currentLocation: {},
      },
      destinations: {
        ids: [5],
        byId: {
          5: {
            id: 5,
            name: 'SFO',
            address: 'SFO, San Francisco, CA 94128',
          },
        },
      },
      journeys: {
        byDestinationId: {},
      },
    };

    const expectedActions = [
      {
        type: TYPES.ADD_JOURNEYS,
        destinationId: 5,
        journeys: [
          { departureTime: '11:50pm', arrivalTime: '12:30am' },
          { departureTime: '11:55pm', arrivalTime: '12:45am' },
        ],
      },
    ];

    const mockStore = configureStore([thunk.withExtraArgument(extraArgument)]);
    const store = mockStore(initialState);

    return store.dispatch(actions.fetchJourneys(5, 'home', 'work', '07:15am')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
