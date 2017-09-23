import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { JourneyTable, mapStateToProps, mapDispatchToProps } from './JourneyTable';

describe('JourneyTable', () => {
  const testData = {
    destinationId: 1,
    origin: '',
    destinationsById: { 1: {} },
    journeys: [
      {
        departureTimeUTC: 1502222222,
        arrivalTimeText: '00:00am',
        transitSteps: [
          { duration: '1 mins', instruction: 'Walk to Some St. Station', mode: 'WALKING' },
          {
            duration: '23 mins',
            instruction: 'Metro rail towards Warm Springs/South Fremont',
            mode: 'TRANSIT',
          },
        ],
      },
      {
        departureTimeUTC: 1502222555,
        arrivalTimeText: '00:00pm',
        transitSteps: [
          { duration: '4 mins', instruction: 'Walk to Some St. Station', mode: 'WALKING' },
          {
            duration: '56 mins',
            instruction: 'Metro rail towards Warm Springs/South Fremont',
            mode: 'TRANSIT',
          },
        ],
      },
    ],
    timeToLeaveInSeconds: 1502222223,
    alerts: {
      1: {
        affectedLines: ['18', '52'],
        description:
          'Due to construction, Lines 18 and 52 will not serve any stops on Monroe Street between Jackson Street and San Pablo Avenue..',
        subject:
          'Lines 18 and 52 - Stop Closures near UC Village on Monroe Street and San Pablo Avenue',
      },
    },
  };

  it('should render Loading...', () => {
    const component = shallow(
      <JourneyTable
        id={1}
        destinationId={testData.destinationId}
        origin={testData.origin}
        destinationsById={testData.destinationsById}
        journeys={null}
        fetchJourneys={() => {}}
      />,
    );
    expect(toJson(component)).toMatchSnapshot();
  });

  it('mapStateToProps', () => {
    const state = {
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

    const expected = {
      alerts: undefined,
      destinationId: 5,
      destinationsById: {
        5: {
          address: 'SFO, San Francisco, CA 94128',
          id: 5,
        },
      },
      journeys: undefined,
      origin: '44 Tehama St, San Francisco, CA 94105',
    };
    expect(mapStateToProps(state, { id: 5, widgetId: 'transit' })).toEqual(expected);
  });

  it('mapDispatchToProps', () => {
    const dispatch = jest.fn();

    expect(mapDispatchToProps(dispatch)).toHaveProperty('fetchJourneys');
  });

  it('calls fetchJourneys on load', () => {
    const fetchJourneys = jest.fn();
    mount(
      <JourneyTable
        id={1}
        destinationId={testData.destinationId}
        origin={testData.origin}
        destinationsById={testData.destinationsById}
        journeys={testData.journeys}
        fetchJourneys={fetchJourneys}
      />,
    );

    expect(fetchJourneys).toHaveBeenCalled();
  });
});
