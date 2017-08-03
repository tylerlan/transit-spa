import reducer from '.';
import * as TYPES from '../constants/constants';

describe('root reducer', () => {
  it('should return the initial state', () => {
    const expectedInitialState = {
      configuration: {
        currentLocation: {},
      },
      destinations: {
        ids: [],
        byId: {},
      },
      journeys: {
        byDestinationId: {},
      },
    };

    expect(reducer(undefined, {})).toEqual(expectedInitialState);
  });

  it('should handle action type UPDATE_CURRENT_LOCATION', () => {
    let oldState = {
      configuration: {
        currentLocation: {},
      },
      destinations: {
        ids: [],
        byId: {},
      },
      journeys: {
        byDestinationId: {},
      },
    };

    let action = {
      type: TYPES.UPDATE_CURRENT_LOCATION,
      currentLocation: {
        name: 'Galvanize',
        address: '44 Tehama St, San Francisco, CA 94105',
      },
    };

    let newState = {
      configuration: {
        currentLocation: {
          name: 'Galvanize',
          address: '44 Tehama St, San Francisco, CA 94105',
        },
      },
      destinations: {
        ids: [],
        byId: {},
      },
      journeys: {
        byDestinationId: {},
      },
    };

    expect(reducer(oldState, action)).toEqual(newState);

    oldState = newState;

    action = {
      type: TYPES.UPDATE_CURRENT_LOCATION,
      currentLocation: {
        name: 'Galvanize!',
        address: '543 Howard St, San Francisco, CA 94105',
      },
    };

    newState = {
      configuration: {
        currentLocation: {
          name: 'Galvanize!',
          address: '543 Howard St, San Francisco, CA 94105',
        },
      },
      destinations: {
        ids: [],
        byId: {},
      },
      journeys: {
        byDestinationId: {},
      },
    };

    expect(reducer(oldState, action)).toEqual(newState);
  });

  it('should handle action type ADD_DESTINATION', () => {
    let oldState = {
      configuration: {
        currentLocation: {
          name: 'Galvanize',
          address: '44 Tehama St, San Francisco, CA 94105',
        },
      },
      destinations: {
        ids: [],
        byId: {},
      },
      journeys: {
        byDestinationId: {},
      },
    };

    let action = {
      type: TYPES.ADD_DESTINATION,
      destination: {
        id: 5,
        name: 'SFO',
        address: 'SFO, San Francisco, CA 94128',
      },
    };

    let newState = {
      configuration: {
        currentLocation: {
          name: 'Galvanize',
          address: '44 Tehama St, San Francisco, CA 94105',
        },
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

    expect(reducer(oldState, action)).toEqual(newState);

    oldState = newState;

    action = {
      type: TYPES.ADD_DESTINATION,
      destination: {
        id: 6,
        name: 'OAK',
        address: 'OAK, Oakland, CA 94234',
      },
    };

    newState = {
      configuration: {
        currentLocation: {
          name: 'Galvanize',
          address: '44 Tehama St, San Francisco, CA 94105',
        },
      },
      destinations: {
        ids: [5, 6],
        byId: {
          5: {
            id: 5,
            name: 'SFO',
            address: 'SFO, San Francisco, CA 94128',
          },
          6: {
            id: 6,
            name: 'OAK',
            address: 'OAK, Oakland, CA 94234',
          },
        },
      },
      journeys: {
        byDestinationId: {},
      },
    };

    expect(reducer(oldState, action)).toEqual(newState);
  });

  it('should handle action type ADD_JOURNEYS', () => {
    let oldState = {
      configuration: {
        currentLocation: {
          name: 'Galvanize',
          address: '44 Tehama St, San Francisco, CA 94105',
        },
      },
      destinations: {
        ids: [5, 6],
        byId: {
          5: {
            id: 5,
            name: 'SFO',
            address: 'SFO, San Francisco, CA 94128',
          },
          6: {
            id: 6,
            name: 'OAK',
            address: 'OAK, Oakland, CA 94234',
          },
        },
      },
      journeys: {
        byDestinationId: {},
      },
    };

    let action = {
      type: TYPES.ADD_JOURNEYS,
      destinationId: 5,
      journeys: [{ departureTime: '11:50pm', arrivalTime: '12:30am' }],
    };

    let newState = {
      configuration: {
        currentLocation: {
          name: 'Galvanize',
          address: '44 Tehama St, San Francisco, CA 94105',
        },
      },
      destinations: {
        ids: [5, 6],
        byId: {
          5: {
            id: 5,
            name: 'SFO',
            address: 'SFO, San Francisco, CA 94128',
          },
          6: {
            id: 6,
            name: 'OAK',
            address: 'OAK, Oakland, CA 94234',
          },
        },
      },
      journeys: {
        byDestinationId: {
          5: [{ departureTime: '11:50pm', arrivalTime: '12:30am' }],
        },
      },
    };

    expect(reducer(oldState, action)).toEqual(newState);

    oldState = newState;

    action = {
      type: TYPES.ADD_JOURNEYS,
      destinationId: 5,
      journeys: [
        { departureTime: '11:55pm', arrivalTime: '12:45am' },
        { departureTime: '11:58pm', arrivalTime: '12:48am' },
      ],
    };

    newState = {
      configuration: {
        currentLocation: {
          name: 'Galvanize',
          address: '44 Tehama St, San Francisco, CA 94105',
        },
      },
      destinations: {
        ids: [5, 6],
        byId: {
          5: {
            id: 5,
            name: 'SFO',
            address: 'SFO, San Francisco, CA 94128',
          },
          6: {
            id: 6,
            name: 'OAK',
            address: 'OAK, Oakland, CA 94234',
          },
        },
      },
      journeys: {
        byDestinationId: {
          5: [
            { departureTime: '11:50pm', arrivalTime: '12:30am' },
            { departureTime: '11:55pm', arrivalTime: '12:45am' },
            { departureTime: '11:58pm', arrivalTime: '12:48am' },
          ],
        },
      },
    };

    expect(reducer(oldState, action)).toEqual(newState);
  });

  it('should handle action type REMOVE_JOURNEY', () => {
    const oldState = {
      configuration: {
        currentLocation: {
          name: 'Galvanize',
          address: '44 Tehama St, San Francisco, CA 94105',
        },
      },
      destinations: {
        ids: [5, 6],
        byId: {
          5: {
            id: 5,
            name: 'SFO',
            address: 'SFO, San Francisco, CA 94128',
          },
          6: {
            id: 6,
            name: 'OAK',
            address: 'OAK, Oakland, CA 94234',
          },
        },
      },
      journeys: {
        byDestinationId: {
          5: [
            { departureTime: '11:50pm', arrivalTime: '12:30am' },
            { departureTime: '11:55pm', arrivalTime: '12:45am' },
          ],
          6: [
            { departureTime: '11:50pm', arrivalTime: '12:30am' },
            { departureTime: '11:55pm', arrivalTime: '12:45am' },
          ],
        },
      },
    };

    const action = {
      type: TYPES.REMOVE_JOURNEY,
      destinationId: 5,
      index: 0,
    };

    const newState = {
      configuration: {
        currentLocation: {
          name: 'Galvanize',
          address: '44 Tehama St, San Francisco, CA 94105',
        },
      },
      destinations: {
        ids: [5, 6],
        byId: {
          5: {
            id: 5,
            name: 'SFO',
            address: 'SFO, San Francisco, CA 94128',
          },
          6: {
            id: 6,
            name: 'OAK',
            address: 'OAK, Oakland, CA 94234',
          },
        },
      },
      journeys: {
        byDestinationId: {
          5: [{ departureTime: '11:55pm', arrivalTime: '12:45am' }],
          6: [
            { departureTime: '11:50pm', arrivalTime: '12:30am' },
            { departureTime: '11:55pm', arrivalTime: '12:45am' },
          ],
        },
      },
    };

    expect(reducer(oldState, action)).toEqual(newState);
  });

  it('should handle action type REMOVE_DESTINATION', () => {
    const oldState = {
      configuration: {
        currentLocation: {
          name: 'Galvanize',
          address: '44 Tehama St, San Francisco, CA 94105',
        },
      },
      destinations: {
        ids: [5, 6],
        byId: {
          5: {
            id: 5,
            name: 'SFO',
            address: 'SFO, San Francisco, CA 94128',
          },
          6: {
            id: 6,
            name: 'OAK',
            address: 'OAK, Oakland, CA 94234',
          },
        },
      },
      journeys: {
        byDestinationId: {
          5: [
            { departureTime: '11:50pm', arrivalTime: '12:30am' },
            { departureTime: '11:55pm', arrivalTime: '12:45am' },
          ],
          6: [
            { departureTime: '11:50pm', arrivalTime: '12:30am' },
            { departureTime: '11:55pm', arrivalTime: '12:45am' },
          ],
        },
      },
    };

    const action = {
      type: TYPES.REMOVE_DESTINATION,
      destinationId: 5,
    };

    const newState = {
      configuration: {
        currentLocation: {
          name: 'Galvanize',
          address: '44 Tehama St, San Francisco, CA 94105',
        },
      },
      destinations: {
        ids: [6],
        byId: {
          5: {
            id: 5,
            name: 'SFO',
            address: 'SFO, San Francisco, CA 94128',
          },
          6: {
            id: 6,
            name: 'OAK',
            address: 'OAK, Oakland, CA 94234',
          },
        },
      },
      journeys: {
        byDestinationId: {
          5: [
            { departureTime: '11:50pm', arrivalTime: '12:30am' },
            { departureTime: '11:55pm', arrivalTime: '12:45am' },
          ],
          6: [
            { departureTime: '11:50pm', arrivalTime: '12:30am' },
            { departureTime: '11:55pm', arrivalTime: '12:45am' },
          ],
        },
      },
    };

    expect(reducer(oldState, action)).toEqual(newState);
  });
});
