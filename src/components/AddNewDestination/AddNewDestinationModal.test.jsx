import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import AddNewDestinationModal from './AddNewDestinationModal';

describe('AddNewDestinationModal', () => {
  it('should render modal', () => {
    const component = shallow(<AddNewDestinationModal />);
    expect(toJson(component)).toMatchSnapshot();
  });
});
