import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { RemoveDestinationButton } from './RemoveDestinationButton';

describe('RemoveDestinationButton', () => {
  it('should render a remove button', () => {
    const id = 5;
    const component = shallow(<RemoveDestinationButton id={id} />);
    expect(toJson(component)).toMatchSnapshot();
  });
});
