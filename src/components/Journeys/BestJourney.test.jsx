import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import BestJourney from './BestJourney';

describe('BestJourney', () => {
  it('should render when passed required props', () => {
    const timeToLeaveInSeconds = 120;
    const steps = [
      { duration: '1 mins', instruction: 'Walk to Some St. Station', mode: 'WALKING' },
    ];
    const eta = '11:00am';
    const conditionStatus = 'on-time';

    const component = mount(
      <BestJourney
        timeToLeaveInSeconds={timeToLeaveInSeconds}
        steps={steps}
        eta={eta}
        conditionStatus={conditionStatus}
      />,
    );
    expect(toJson(component)).toMatchSnapshot();
  });
});
