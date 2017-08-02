import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import AddNewDestinationForm from './AddNewDestinationForm';

describe('AddNewDestinationForm', () => {
  it('should render blank form', () => {
    const component = shallow(<AddNewDestinationForm />);
    expect(toJson(component)).toMatchSnapshot();
  });
});
