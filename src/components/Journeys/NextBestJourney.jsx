import React from 'react';
import PropTypes from 'prop-types';

import { List, Segment } from 'semantic-ui-react';

import TimeToLeaveTimer from './Journey/TimeToLeaveTimer';
import JourneyVisualization from './Journey/JourneyVisualization';
import ArriveByEstimate from './Journey/ArriveByEstimate';
import CurrentConditionsStatus from './Journey/CurrentConditionsStatus';

const NextBestJourney = ({ timeToLeave, steps, eta, conditionStatus }) =>
  (<Segment tertiary>
    <List divided horizontal size="huge">
      <TimeToLeaveTimer timeToLeave={timeToLeave} />
      <JourneyVisualization active steps={steps} />
      <ArriveByEstimate eta={eta} />
      <CurrentConditionsStatus conditionStatus={conditionStatus} />
    </List>
  </Segment>);

NextBestJourney.propTypes = {
  timeToLeave: PropTypes.number.isRequired,
  steps: PropTypes.node.isRequired,
  eta: PropTypes.string.isRequired,
  conditionStatus: PropTypes.string.isRequired,
};

NextBestJourney.defaultProps = {
  timeToLeave: 1,
  steps: [''],
  eta: '',
  conditionStatus: '',
};

export default NextBestJourney;
