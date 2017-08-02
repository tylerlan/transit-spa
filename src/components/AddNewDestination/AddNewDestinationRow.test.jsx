import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import AddNewDestinationRow from './AddNewDestinationRow';

describe('AddNewDestinationRow', () => {
  it('should render row', () => {
    const component = shallow(<AddNewDestinationRow />);
    expect(toJson(component)).toMatchSnapshot();
  });
});
