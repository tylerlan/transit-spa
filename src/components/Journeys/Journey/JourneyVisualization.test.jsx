import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import JourneyVisualization from './JourneyVisualization';

describe('JourneyVisualization', () => {
  it('renders when given one step', () => {
    const component = shallow(
      <JourneyVisualization
        steps={[{ duration: '4 mins', instruction: 'Walk to Some St. Station', mode: 'WALKING' }]}
      />,
    );
    expect(toJson(component)).toMatchSnapshot();
  });

  it('renders when given multiple steps', () => {
    const component = shallow(
      <JourneyVisualization
        steps={[
          { duration: '4 mins', instruction: 'Walk to Some St. Station', mode: 'WALKING' },
          {
            agency: 'SFMTA',
            duration: '6 mins',
            headsign: 'Daly City',
            icon: undefined,
            instruction: 'Bus towards Daly City',
            line: '14',
            localIcon: undefined,
            longName: 'Mission',
            mode: 'TRANSIT',
            shortName: '14',
            vehicle: 'Bus',
          },
        ]}
      />,
    );
    expect(toJson(component)).toMatchSnapshot();
  });
});
