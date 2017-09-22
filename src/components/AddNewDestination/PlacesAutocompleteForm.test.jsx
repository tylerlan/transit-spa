import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { PlacesAutocompleteForm, mapStateToProps, mapDispatchToProps  } from './PlacesAutocompleteForm';

describe('PlacesAutocompleteForm', () => {
  const state = {
    widgets: {
      byId: {
        'transit': {
          configuration: {
            geolocating: true,
            currentLocation: {
              address: '44 Tehama St, San Francisco, CA 94105',
              lat: 37.7873889,
              lng: -122.3964106,
            },
          },
        },
      },
    },
  };


  it('should render an empty form', () => {
    const component = shallow(<PlacesAutocompleteForm />);
    expect(toJson(component)).toMatchSnapshot();
  });

  it("mapStateToProps", () => {
    const expected = {
      origin: '44 Tehama St, San Francisco, CA 94105',
    };
    expect(mapStateToProps(state, { widgetId: 'transit' })).toEqual(expected);
  });

  it('mapDispatchToProps', () => {
    const dispatch = jest.fn();
    expect(mapDispatchToProps(dispatch)).toHaveProperty('addDestination');
  });








});

/*
There is a submit button in the form but it's not possible to test it. The
reason is that when mounting the component a Google library is loaded and it
needs to have a window context.
*/
