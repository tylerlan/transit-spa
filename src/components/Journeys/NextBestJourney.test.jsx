import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import NextBestJourney from './NextBestJourney';

describe('NextBestJourney', () => {
  it('should render when passed required props', () => {
    const timeToLeaveInSeconds = 500;
    const steps = [
      { duration: '5 mins', instruction: 'Walk to Some Other St. Station', mode: 'WALKING' },
    ];
    const eta = '12:00pm';
    const conditionStatus = 'on-time';

    const component = mount(
      <NextBestJourney
        timeToLeaveInSeconds={timeToLeaveInSeconds}
        steps={steps}
        eta={eta}
        conditionStatus={conditionStatus}
      />,
    );
    expect(toJson(component)).toMatchSnapshot();
  });
});
