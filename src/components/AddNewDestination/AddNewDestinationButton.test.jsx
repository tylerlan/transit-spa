import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import AddNewDestinationButton from './AddNewDestinationButton';

describe('AddNewDestinationButton', () => {
  it('should render button', () => {
    const component = shallow(<AddNewDestinationButton />);
    expect(toJson(component)).toMatchSnapshot();
  });
});
