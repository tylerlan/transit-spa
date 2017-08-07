import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Timer from './Timer';

describe('Timer', () => {
  it('renders when passed seconds as props', () => {
    const seconds = 120;
    const callback = () => {};

    const component = shallow(<Timer seconds={seconds} onComplete={callback} />);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('accepts a callback function as props', () => {
    const seconds = 120;
    const callback = () => {};

    const component = mount(<Timer seconds={seconds} onComplete={callback} />);
    expect(component.props().onComplete).toEqual(callback);
  });

  it('initializes with count equal the the seconds and expired equal to false in the state', () => {
    const seconds = 120;
    const callback = () => {};

    const component = mount(<Timer seconds={seconds} onComplete={callback} />);
    expect(component.state('count')).toEqual(120);
    expect(component.state('expired')).toEqual(false);
  });

  it('calls decrementOrExpire and decreases the count', () => {
    const seconds = 120;
    const expected = { count: seconds - 1 };
    const callback = () => {};

    const component = shallow(<Timer seconds={seconds} onComplete={callback} />);
    expect(component.instance().state.count).toEqual(seconds);
    expect(component.instance().decrementOrExpire().count).toEqual(expected.count);
  });

  it('has componentWillReceiveProps', () => {
    const initialSeconds = 120;
    const newSeconds = 300;
    const callback = () => {};

    const component = shallow(<Timer seconds={initialSeconds} onComplete={callback} />);
    expect(component.instance().state.count).toEqual(initialSeconds);
    // expect(component.instance().componentWillReceiveProps(newSeconds).count).toEqual(newSeconds);
  });
});
