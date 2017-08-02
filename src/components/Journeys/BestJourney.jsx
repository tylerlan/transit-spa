import React from 'react';
import PropTypes from 'prop-types';

import { List, Segment } from 'semantic-ui-react';

import TimeToLeaveTimer from './Journey/TimeToLeaveTimer';
import JourneyVisualization from './Journey/JourneyVisualization';
import ArriveByEstimate from './Journey/ArriveByEstimate';
import CurrentConditionsStatus from './Journey/CurrentConditionsStatus';

const BestJourney = ({ timeToLeave, steps, eta, conditionStatus }) =>
  (<Segment>
    <List divided horizontal size="huge">
      <TimeToLeaveTimer timeToLeave={timeToLeave} />
      <JourneyVisualization active={false} steps={steps} />
      <ArriveByEstimate eta={eta} />
      <CurrentConditionsStatus conditionStatus={conditionStatus} />
    </List>
  </Segment>);

BestJourney.propTypes = {
  timeToLeave: PropTypes.number.isRequired,
  steps: PropTypes.node.isRequired,
  eta: PropTypes.string.isRequired,
  conditionStatus: PropTypes.string.isRequired,
};

BestJourney.defaultProps = {
  timeToLeave: 1,
  steps: [''],
  eta: '',
  conditionStatus: '',
};

export default BestJourney;
