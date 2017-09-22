import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { DestinationTable, mapStateToProps } from './DestinationTable';

describe('DestinationTable', () => {
  it('should render an empty table', () => {
    const component = shallow(<DestinationTable />);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('mapStateToProps', () => {
    const component = shallow(<DestinationTable />);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('mapStateToProps returns destinationIds and destinationsById', () => {
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
      },
    };

    const expected = {
      destinationIds: [1],
      destinationsById: {
        1: {
          address: 'SFO, San Francisco, CA 94128',
          id: 1,
        },
      },
    };
    expect(mapStateToProps(state, { id: 1, widgetId: 'transit' })).toEqual(expected);
  });
});
