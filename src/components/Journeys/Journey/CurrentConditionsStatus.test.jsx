import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import CurrentConditionsStatus from './CurrentConditionsStatus';

describe('CurrentConditionsStatus', () => {
  it('renders when given an on-time status', () => {
    const component = shallow(<CurrentConditionsStatus conditionStatus={'on-time'} />);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('renders when given a delayed status', () => {
    const component = shallow(
      <CurrentConditionsStatus conditionStatus={'delayed for some time due to reasons'} />,
    );
    expect(toJson(component)).toMatchSnapshot();
  });
});
