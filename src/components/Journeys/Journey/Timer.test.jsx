import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import Timer, { timerExpired } from './Timer';

describe('Timer', () => {
  it('renders Timer', () => {
    const seconds = 5;
    const callback = () => {};

    const component = mount(<Timer seconds={seconds} onComplete={callback} />);
    expect(component.props().onComplete).is.equal(callback);
    expect(component.state('count')).is.deep.equal(5);
    expect(component.state('expired')).is.deep.equal(false);
  });

  it('decrementOrExpire should be called and decrease count', () => {
    const seconds = 5;
    const expected = { count: seconds - 1 };
    const callback = () => {};

    const component = shallow(<Timer seconds={seconds} onComplete={callback} />);
    expect(component.instance().decrementOrExpire().count).is.equal(expected.count);
  });
});
