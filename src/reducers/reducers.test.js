import reducer from '.';
import * as TYPES from '../constants/constants';

describe('root reducer', () => {
  it('should return the initial state', () => {
    const expectedInitialState = {
      widgets: {
        byId: {
          transit: {
            configuration: {
              geolocating: true,
              currentLocation: {
                address: '44 Tehama St, San Francisco, CA 94105',
                lat: 37.7873889,
                lng: -122.3964106,
              },
            },
            destinations: {
              ids: [],
              byId: {},
            },
            journeys: {
              byDestinationId: {},
            },
          },
        },
        ids: ['transit'],
      },
    };

    expect(reducer(undefined, {})).toEqual(expectedInitialState);
  });

  it('should handle action type UPDATE_CURRENT_LOCATION', () => {
    const oldState = {
      widgets: {
        byId: {
          transit: {
            configuration: {
              geolocating: true,
              currentLocation: {
                address: '44 Tehama St, San Francisco, CA 94105',
                lat: 37.7873889,
                lng: -122.3964106,
              },
            },
            destinations: {
              ids: [],
              byId: {},
            },
            journeys: {
              byDestinationId: {},
            },
          },
        },
        ids: ['transit'],
      },
    };

    const action = {
      type: TYPES.UPDATE_CURRENT_LOCATION,
      geolocating: true,
      currentLocation: {
        address: '543 Howard St, San Francisco, CA 94105',
        lat: 37.123456,
        lng: -122.123456,
      },
    };

    const newState = {
      widgets: {
        byId: {
          transit: {
            configuration: {
              geolocating: false,
              currentLocation: {
                address: '543 Howard St, San Francisco, CA 94105',
                lat: 37.123456,
                lng: -122.123456,
              },
            },
            destinations: {
              ids: [],
              byId: {},
            },
            journeys: {
              byDestinationId: {},
            },
          },
        },
        ids: ['transit'],
      },
    };

    expect(reducer(oldState, action)).toEqual(newState);
  });

  it('should handle action type ADD_DESTINATION', () => {
    let oldState = {
      widgets: {
        byId: {
          transit: {
            configuration: {
              currentLocation: {
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
          },
        },
        ids: ['transit'],
      },
    };

    let action = {
      type: TYPES.ADD_DESTINATION,
      destination: 'SFO, San Francisco, CA 94128',
    };

    let newState = {
      widgets: {
        byId: {
          transit: {
            configuration: {
              currentLocation: {
                address: '44 Tehama St, San Francisco, CA 94105',
              },
            },
            destinations: {
              ids: [1],
              byId: {
                1: {
                  id: 1,
                  address: 'SFO, San Francisco, CA 94128',
                },
              },
            },
            journeys: {
              byDestinationId: {},
            },
          },
        },
        ids: ['transit'],
      },
    };

    expect(reducer(oldState, action)).toEqual(newState);

    oldState = newState;

    action = {
      type: TYPES.ADD_DESTINATION,
      destination: 'OAK, Oakland, CA 94234',
    };

    newState = {
      widgets: {
        byId: {
          transit: {
            configuration: {
              currentLocation: {
                address: '44 Tehama St, San Francisco, CA 94105',
              },
            },
            destinations: {
              ids: [1, 2],
              byId: {
                1: {
                  id: 1,
                  address: 'SFO, San Francisco, CA 94128',
                },
                2: {
                  id: 2,
                  address: 'OAK, Oakland, CA 94234',
                },
              },
            },
            journeys: {
              byDestinationId: {},
            },
          },
        },
        ids: ['transit'],
      },
    };

    expect(reducer(oldState, action)).toEqual(newState);
  });

  it('should handle action type ADD_JOURNEYS', () => {
    let oldState = {
      widgets: {
        byId: {
          transit: {
            configuration: {
              currentLocation: {
                address: '44 Tehama St, San Francisco, CA 94105',
              },
            },
            destinations: {
              ids: [5, 6],
              byId: {
                5: {
                  id: 5,
                  address: 'SFO, San Francisco, CA 94128',
                },
                6: {
                  id: 6,
                  address: 'OAK, Oakland, CA 94234',
                },
              },
            },
            journeys: {
              byDestinationId: {},
            },
          },
        },
        ids: ['transit'],
      },
    };

    let action = {
      type: TYPES.ADD_JOURNEYS,
      destinationId: 5,
      journeys: [{ departureTime: '11:50pm', arrivalTime: '12:30am' }],
    };

    let newState = {
      widgets: {
        byId: {
          transit: {
            configuration: {
              currentLocation: {
                address: '44 Tehama St, San Francisco, CA 94105',
              },
            },
            destinations: {
              ids: [5, 6],
              byId: {
                5: {
                  id: 5,
                  address: 'SFO, San Francisco, CA 94128',
                },
                6: {
                  id: 6,
                  address: 'OAK, Oakland, CA 94234',
                },
              },
            },
            journeys: {
              byDestinationId: {
                5: [{ departureTime: '11:50pm', arrivalTime: '12:30am' }],
              },
            },
          },
        },
        ids: ['transit'],
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
      widgets: {
        byId: {
          transit: {
            configuration: {
              currentLocation: {
                address: '44 Tehama St, San Francisco, CA 94105',
              },
            },
            destinations: {
              ids: [5, 6],
              byId: {
                5: {
                  id: 5,
                  address: 'SFO, San Francisco, CA 94128',
                },
                6: {
                  id: 6,
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
          },
        },
        ids: ['transit'],
      },
    };

    expect(reducer(oldState, action)).toEqual(newState);
  });

  it('should handle action type REMOVE_JOURNEYS', () => {
    const oldState = {
      widgets: {
        byId: {
          transit: {
            configuration: {
              currentLocation: {
                address: '44 Tehama St, San Francisco, CA 94105',
              },
            },
            destinations: {
              ids: [5, 6],
              byId: {
                5: {
                  id: 5,
                  address: 'SFO, San Francisco, CA 94128',
                },
                6: {
                  id: 6,
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
          },
        },
        ids: ['transit'],
      },
    };

    const action = {
      type: TYPES.REMOVE_JOURNEYS,
      destinationId: 5,
    };

    const newState = {
      widgets: {
        byId: {
          transit: {
            configuration: {
              currentLocation: {
                address: '44 Tehama St, San Francisco, CA 94105',
              },
            },
            destinations: {
              ids: [5, 6],
              byId: {
                5: {
                  id: 5,
                  address: 'SFO, San Francisco, CA 94128',
                },
                6: {
                  id: 6,
                  address: 'OAK, Oakland, CA 94234',
                },
              },
            },
            journeys: {
              byDestinationId: {
                5: [],
                6: [
                  { departureTime: '11:50pm', arrivalTime: '12:30am' },
                  { departureTime: '11:55pm', arrivalTime: '12:45am' },
                ],
              },
            },
          },
        },
        ids: ['transit'],
      },
    };

    expect(reducer(oldState, action)).toEqual(newState);
  });

  it('should handle action type REMOVE_DESTINATION', () => {
    const oldState = {
      widgets: {
        byId: {
          transit: {
            configuration: {
              currentLocation: {
                address: '44 Tehama St, San Francisco, CA 94105',
              },
            },
            destinations: {
              ids: [5, 6],
              byId: {
                5: {
                  id: 5,
                  address: 'SFO, San Francisco, CA 94128',
                },
                6: {
                  id: 6,
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
          },
        },
        ids: ['transit'],
      },
    };

    const action = {
      type: TYPES.REMOVE_DESTINATION,
      destinationId: 5,
    };

    const newState = {
      widgets: {
        byId: {
          transit: {
            configuration: {
              currentLocation: {
                address: '44 Tehama St, San Francisco, CA 94105',
              },
            },
            destinations: {
              ids: [6],
              byId: {
                5: {
                  id: 5,
                  address: 'SFO, San Francisco, CA 94128',
                },
                6: {
                  id: 6,
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
          },
        },
        ids: ['transit'],
      },
    };

    expect(reducer(oldState, action)).toEqual(newState);
  });
});
