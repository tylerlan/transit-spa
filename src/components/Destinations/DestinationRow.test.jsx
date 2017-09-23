import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import DestinationRow from './DestinationRow';

describe('DestinationRow', () => {
  it('should render when given a name and id', () => {
    const id = 1;
    const name = 'Tartine';
    const component = shallow(<DestinationRow id={id} name={name} />);
    expect(toJson(component)).toMatchSnapshot();
  });
});
