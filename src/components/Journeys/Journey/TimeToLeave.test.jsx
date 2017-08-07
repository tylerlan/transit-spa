import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import TimeToLeave, { timerExpired } from './TimeToLeave';

describe('TimeToLeave', () => {
  it('should render list item', () => {
    const seconds = 120;

    const component = mount(<TimeToLeave timeToLeaveInSeconds={seconds} />);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('has timeToLeaveInSeconds prop as a number of seconds', () => {
    const seconds = 120;

    const component = mount(<TimeToLeave timeToLeaveInSeconds={seconds} />);
    expect(component.props().timeToLeaveInSeconds).toEqual(seconds);
  });

  it('has timerExpired callback', () => {
    expect(timerExpired()).toEqual(<div>RUN!!!</div>);
  });
});
