import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';
import TimeToLeave, { timerExpired } from './TimeToLeave';

describe('TimeToLeave', () => {
  it('should render list item', () => {
    const minutes = 5;

    const component = mount(<TimeToLeave timeToLeave={minutes} />);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('has timeToLeave prop as a number of minutes', () => {
    const minutes = 5;

    const component = mount(<TimeToLeave timeToLeave={minutes} />);
    expect(component.props().timeToLeave).toEqual(minutes);
  });
});
