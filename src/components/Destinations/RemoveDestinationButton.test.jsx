import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { RemoveDestinationButton, mapDispatchToProps } from './RemoveDestinationButton';

describe('RemoveDestinationButton', () => {
  it('should render a remove button', () => {
    const id = 1;
    const component = shallow(<RemoveDestinationButton id={id} />);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('mapDispatchToProps', () => {
    const dispatch = jest.fn();

    expect(mapDispatchToProps(dispatch)).toHaveProperty('removeDestination');
  });
});
