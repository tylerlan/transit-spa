import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Timer from './Timer';

describe('Timer', () => {
  const callback = () => {};

  it('renders when passed seconds as props', () => {
    const component = shallow(<Timer seconds={120} onComplete={callback} />);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('accepts a callback function as props', () => {
    const component = mount(<Timer seconds={120} onComplete={callback} />);
    expect(component.props().onComplete).toEqual(callback);
  });

  it('initializes with currentCount equal to the seconds passed in as props', () => {
    const component = mount(<Timer seconds={120} onComplete={callback} />);
    expect(component.state('currentCount')).toEqual(120);
  });

  it('calls decrement and decreases the currentCount', () => {
    const component = shallow(<Timer seconds={120} onComplete={callback} />);
    expect(component.instance().state.currentCount).toEqual(120);
    expect(component.instance().decrement().currentCount).toEqual(119);
  });

  it('has componentWillReceiveProps', () => {
    const initialSeconds = 120;
    const newSeconds = 300;

    const component = shallow(<Timer seconds={initialSeconds} onComplete={callback} />);
    expect(component.instance().state.currentCount).toEqual(initialSeconds);
    // expect(component.instance().componentWillReceiveProps(newSeconds).currentCount).toEqual(
    //   newSeconds,
    // );
    component.instance().componentWillReceiveProps(newSeconds);
    expect(component.instance().state.currentCount).toEqual(newSeconds);
  });

  it('calls componentDidMount on load', () => {
    const componentDidMount = jest.fn();
    const component = mount(<Timer seconds={120} onComplete={callback} />);
    expect(componentDidMount).toHaveBeenCalled();
  });
});
