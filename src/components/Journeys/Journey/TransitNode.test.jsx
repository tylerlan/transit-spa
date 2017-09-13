import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import TransitNode from './TransitNode';

describe('TransitNode', () => {
  it('renders step with some inputs', () => {
    const component = shallow(
      <TransitNode
        step={{ duration: '4 mins', instruction: 'Walk to Some St. Station', mode: 'WALKING' }}
      />,
    );
    expect(toJson(component)).toMatchSnapshot();
  });

  it('renders step with more inputs', () => {
    const component = shallow(
      <TransitNode
        step={{
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
        }}
      />,
    );
    expect(toJson(component)).toMatchSnapshot();
  });
});
