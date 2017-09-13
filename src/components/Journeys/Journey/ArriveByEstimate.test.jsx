import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import ArriveByEstimate from './ArriveByEstimate';

describe('ArriveByEstimate', () => {
  it('renders when given an eta', () => {
    const component = shallow(<ArriveByEstimate eta={'12:34pm'} />);
    expect(toJson(component)).toMatchSnapshot();
  });
});
