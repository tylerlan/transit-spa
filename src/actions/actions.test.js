import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
// import nock from 'nock';
import * as TYPES from '../constants/constants';
import * as HELPERS from '../utils/apiHelpers';
import * as actions from './index';

describe('actions', () => {
  it('should create actions to display geolocating in progress and update current location', () => {
    const apiGetCurrentLocation = jest.fn();

    apiGetCurrentLocation.mockReturnValue(
      Promise.resolve({
        address: '44 Tehama St, San Francisco, CA 94105',
        lat: 37.7873889,
        lng: -122.3964106,
      }),
    );

    const extraArgument = {
      TRANSIT_API: {
        getCurrentLocation: apiGetCurrentLocation,
      },
    };

    const initialState = {
      widgets: {
        ids: ['transit'],
        byId: {
          transit: {
            configuration: {
              geolocating: false,
              currentLocation: {
                address: '44 Tehama St, San Francisco, CA 94105',
              },
            },
            destinations: {
              ids: [5],
              byId: {
                5: {
                  id: 5,
                  address: 'SFO, San Francisco, CA 94128',
                },
              },
            },
            journeys: {
              byDestinationId: {},
            },
          },
        },
      },
    };

    const expectedActions = [
      { type: TYPES.GEOLOCATING },
      {
        type: TYPES.UPDATE_CURRENT_LOCATION,
        currentLocation: {
          address: '44 Tehama St, San Francisco, CA 94105',
          lat: 37.7873889,
          lng: -122.3964106,
        },
      },
    ];

    const mockStore = configureStore([thunk.withExtraArgument(extraArgument)]);
    const store = mockStore(initialState);

    return store.dispatch(actions.updateCurrentLocation()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should create an action to add a destination', () => {
    const destination = 'SFO, San Francisco, CA 94128';

    const expectedAction = {
      type: TYPES.ADD_DESTINATION,
      destination: 'SFO, San Francisco, CA 94128',
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

  it('should create an action to remove all journeys for a destination', () => {
    const destinationId = 5;

    const expectedAction = {
      type: TYPES.REMOVE_JOURNEYS,
      destinationId: 5,
    };

    expect(actions.removeJourneys(destinationId)).toEqual(expectedAction);
  });

  it('should create an action to remove a destination', () => {
    const destinationId = 5;

    const expectedAction = {
      type: TYPES.REMOVE_DESTINATION,
      destinationId: 5,
    };

    expect(actions.removeDestination(destinationId)).toEqual(expectedAction);
  });

  it('should addJourneys and alerts when there are no journeys in the state', () => {
    const theFuture = Date.now() + 500;
    const mockApiFetchJourneys = jest.fn();

    mockApiFetchJourneys.mockReturnValue(
      Promise.resolve([
        {
          legs: [
            {
              end_address: '123 Main st',
              arrival_time: { text: '11:41am' },
              departure_time: { value: theFuture },
              steps: [
                {
                  html_instructions: 'Walk to Montgomery St. Station',
                  travel_mode: 'WALKING',
                  duration: { text: '8 mins' },
                  line: 'N/A',
                  vehicle: 'N/A',
                },
              ],
            },
          ],
        },
      ]),
    );
    const mockApiFetchAlerts = jest.fn();
    mockApiFetchAlerts.mockReturnValue(
      Promise.resolve({
        1: {
          affectedLines: ['18', '52'],
          description:
            'Due to construction, Lines 18 and 52 will not serve any stops on Monroe Street between Jackson Street and San Pablo Avenue..',
          subject:
            'Lines 18 and 52 - Stop Closures near UC Village on Monroe Street and San Pablo Avenue',
        },
      }),
    );

    const extraArgument = {
      TRANSIT_API: {
        fetchJourneys: mockApiFetchJourneys,
        fetchAlerts: mockApiFetchAlerts,
      },
    };

    const stateWithNoJourneys = {
      widgets: {
        ids: ['transit'],
        byId: {
          transit: {
            configuration: {
              currentLocation: {
                address: '44 Tehama St, San Francisco, CA 94105',
              },
            },
            destinations: {
              ids: [5],
              byId: {
                5: {
                  id: 5,
                  address: 'SFO, San Francisco, CA 94128',
                },
              },
            },
            journeys: {
              byDestinationId: {},
            },
            alerts: {},
          },
        },
      },
    };

    const expectedActions = [
      {
        type: TYPES.ADD_JOURNEYS,
        destinationId: 5,
        journeys: [
          {
            alerts: ['on-time'],
            destination: '123 Main st',
            arrivalTimeText: '11:41am',
            departureTimeUTC: theFuture,
            transitSteps: [
              {
                agency: '',
                duration: '8 mins',
                headsign: '',
                icon: 'N/A',
                instruction: 'Walk to Montgomery St. Station',
                line: 'N/A',
                localIcon: 'N/A',
                longName: '',
                mode: 'WALKING',
                shortName: '',
                vehicle: 'N/A',
              },
            ],
          },
        ],
      },
      {
        type: TYPES.ALERTS_RETRIEVED,
        alerts: {
          1: {
            affectedLines: ['18', '52'],
            description:
              'Due to construction, Lines 18 and 52 will not serve any stops on Monroe Street between Jackson Street and San Pablo Avenue..',
            subject:
              'Lines 18 and 52 - Stop Closures near UC Village on Monroe Street and San Pablo Avenue',
          },
        },
      },
    ];

    const mockStore = configureStore([thunk.withExtraArgument(extraArgument)]);
    const store = mockStore(stateWithNoJourneys);

    return store.dispatch(actions.fetchJourneys(5, 'home', 'work')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should removeJourneys and addJourneys and alerts when there are already journeys in the state for a destination', () => {
    const theFuture = Date.now() + 500;
    const mockApiFetchJourneys = jest.fn();

    mockApiFetchJourneys.mockReturnValue(
      Promise.resolve([
        {
          legs: [
            {
              end_address: '123 Main st',
              arrival_time: { text: '12:00pm' },
              departure_time: { value: theFuture },
              steps: [
                {
                  html_instructions: 'Walk to Montgomery St. Station',
                  travel_mode: 'WALKING',
                  duration: { text: '8 mins' },
                  line: 'N/A',
                  vehicle: 'N/A',
                },
              ],
            },
          ],
        },
      ]),
    );
    const mockApiFetchAlerts = jest.fn();
    mockApiFetchAlerts.mockReturnValue(
      Promise.resolve({
        1: {
          affectedLines: ['18', '52'],
          description:
            'Due to construction, Lines 18 and 52 will not serve any stops on Monroe Street between Jackson Street and San Pablo Avenue..',
          subject:
            'Lines 18 and 52 - Stop Closures near UC Village on Monroe Street and San Pablo Avenue',
        },
      }),
    );

    const extraArgument = {
      TRANSIT_API: {
        fetchJourneys: mockApiFetchJourneys,
        fetchAlerts: mockApiFetchAlerts,
      },
    };

    const stateWithSomeJourneys = {
      widgets: {
        ids: ['transit'],
        byId: {
          transit: {
            configuration: {
              currentLocation: {
                address: '44 Tehama St, San Francisco, CA 94105',
              },
            },
            destinations: {
              ids: [5],
              byId: {
                5: {
                  id: 5,
                  address: 'SFO, San Francisco, CA 94128',
                },
              },
            },
            journeys: {
              byDestinationId: {
                5: [
                  {
                    alerts: ['on-time'],
                    destination: '123 Main st',
                    arrivalTimeText: '12:00pm',
                    departureTimeUTC: theFuture,
                    transitSteps: [
                      {
                        agency: '',
                        duration: '8 mins',
                        headsign: '',
                        icon: 'N/A',
                        instruction: 'Walk to Montgomery St. Station',
                        line: 'N/A',
                        localIcon: 'N/A',
                        longName: '',
                        mode: 'WALKING',
                        shortName: '',
                        vehicle: 'N/A',
                      },
                    ],
                  },
                ],
              },
            },
            alerts: {},
          },
        },
      },
    };

    const expectedActions = [
      {
        type: TYPES.REMOVE_JOURNEYS,
        destinationId: 5,
      },
      {
        type: TYPES.ADD_JOURNEYS,
        destinationId: 5,
        journeys: [
          {
            alerts: ['on-time'],
            destination: '123 Main st',
            arrivalTimeText: '12:00pm',
            departureTimeUTC: theFuture,
            transitSteps: [
              {
                agency: '',
                duration: '8 mins',
                headsign: '',
                icon: 'N/A',
                instruction: 'Walk to Montgomery St. Station',
                line: 'N/A',
                localIcon: 'N/A',
                longName: '',
                mode: 'WALKING',
                shortName: '',
                vehicle: 'N/A',
              },
            ],
          },
        ],
      },
      {
        type: TYPES.ALERTS_RETRIEVED,
        alerts: {
          1: {
            affectedLines: ['18', '52'],
            description:
              'Due to construction, Lines 18 and 52 will not serve any stops on Monroe Street between Jackson Street and San Pablo Avenue..',
            subject:
              'Lines 18 and 52 - Stop Closures near UC Village on Monroe Street and San Pablo Avenue',
          },
        },
      },
    ];

    const mockStore = configureStore([thunk.withExtraArgument(extraArgument)]);
    const store = mockStore(stateWithSomeJourneys);

    return store.dispatch(actions.fetchJourneys(5, 'home', 'work')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should removeJourneys and addJourneys and alerts when there are already journeys in the state for a destination', () => {
    const theFuture = Date.now() + 500;

    const initialState = {
      widgets: {
        ids: ['transit'],
        byId: {
          transit: {
            configuration: {
              currentLocation: {
                address: '44 Tehama St, San Francisco, CA 94105',
              },
            },
            destinations: {
              ids: [5],
              byId: {
                5: {
                  id: 5,
                  address: 'SFO, San Francisco, CA 94128',
                },
              },
            },
            journeys: {
              byDestinationId: {},
            },
            alerts: {},
          },
        },
      },
    };
    const json = [
      {
        legs: [
          {
            end_address: '123 Main st',
            arrival_time: { text: '12:00pm' },
            departure_time: { value: theFuture },
            steps: [
              {
                html_instructions: 'Walk to Montgomery St. Station',
                travel_mode: 'WALKING',
                duration: { text: '8 mins' },
                line: 'N/A',
                vehicle: 'N/A',
              },
            ],
          },
        ],
      },
    ];
    const alerts = {
      1: {
        affectedLines: ['18', '52'],
        description:
          'Due to construction, Lines 18 and 52 will not serve any stops on Monroe Street between Jackson Street and San Pablo Avenue..',
        subject:
          'Lines 18 and 52 - Stop Closures near UC Village on Monroe Street and San Pablo Avenue',
      },
    };
    const journeys = [
      {
        destination: '123 Main st',
        arrivalTimeText: '12:00pm',
        departureTimeUTC: theFuture,
        transitSteps: [
          {
            agency: '',
            duration: '8 mins',
            headsign: '',
            icon: 'N/A',
            instruction: 'Walk to Montgomery St. Station',
            line: 'N/A',
            localIcon: 'N/A',
            longName: '',
            mode: 'WALKING',
            shortName: '',
            vehicle: 'N/A',
          },
        ],
      },
    ];
    const journeysWithAlerts = [
      {
        alerts: ['on-time'],
        destination: '123 Main st',
        arrivalTimeText: '12:00pm',
        departureTimeUTC: theFuture,
        transitSteps: [
          {
            agency: '',
            duration: '8 mins',
            headsign: '',
            icon: 'N/A',
            instruction: 'Walk to Montgomery St. Station',
            line: 'N/A',
            localIcon: 'N/A',
            longName: '',
            mode: 'WALKING',
            shortName: '',
            vehicle: 'N/A',
          },
        ],
      },
    ];

    const mockApiFetchJourneys = jest.fn();
    mockApiFetchJourneys.mockReturnValue(Promise.resolve(json));

    const mockApiFetchAlerts = jest.fn();
    mockApiFetchAlerts.mockReturnValue(Promise.resolve(alerts));

    HELPERS.createArrayOfJourneyObjects = jest.fn(() => Promise.resolve(journeys));

    HELPERS.applyAlerts = jest.fn(() => Promise.resolve(journeysWithAlerts));

    HELPERS.offsetJourneys = jest.fn(() => Promise.resolve(journeysWithAlerts));

    const extraArgument = {
      TRANSIT_API: {
        fetchJourneys: mockApiFetchJourneys,
        fetchAlerts: mockApiFetchAlerts,
      },
    };

    const mockStore = configureStore([thunk.withExtraArgument(extraArgument)]);
    const store = mockStore(initialState);

    return store
      .dispatch(actions.fetchJourneys(5, 'home', 'work'))
      .then(() => {
        expect(HELPERS.createArrayOfJourneyObjects).toBeCalledWith(json);
      })
      .then(() => {
        expect(HELPERS.applyAlerts).toBeCalledWith(journeys, alerts);
      })
      .then(() => {
        expect(HELPERS.offsetJourneys).toBeCalledWith(journeysWithAlerts);
      });
  });
});
