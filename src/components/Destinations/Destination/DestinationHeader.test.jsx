import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import DestinationHeader from './DestinationHeader';

describe('DestinationHeader', () => {
  it('should render when passed required props', () => {
    const name = 'Tartine';
    const component = shallow(<DestinationHeader name={name} />);

    expect(toJson(component)).toMatchSnapshot();
  });
});
