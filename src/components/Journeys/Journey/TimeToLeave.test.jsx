import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import TimeToLeave, { timerExpired } from './TimeToLeave';

describe('TimeToLeave', () => {
  it('should render list item', () => {
    const component = mount(<TimeToLeave timeToLeaveInSeconds={120} />);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('has timeToLeaveInSeconds prop as a number of seconds', () => {
    const component = mount(<TimeToLeave timeToLeaveInSeconds={120} />);
    expect(component.props().timeToLeaveInSeconds).toEqual(120);
  });

  it('has timerExpired callback', () => {
    const component = mount(<TimeToLeave timeToLeaveInSeconds={120} />);
    expect(component.instance().timerExpired()).toEqual(true);
    // expect(timerExpired()).toEqual(<div>RUN!!!</div>);
  });
});
