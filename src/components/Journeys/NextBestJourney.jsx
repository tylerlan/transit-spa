import React from 'react';
import PropTypes from 'prop-types';

import { List, Segment } from 'semantic-ui-react';

import TimeToLeave from './Journey/TimeToLeave';
import JourneyVisualization from './Journey/JourneyVisualization';
import ArriveByEstimate from './Journey/ArriveByEstimate';
import CurrentConditionsStatus from './Journey/CurrentConditionsStatus';

const NextBestJourney = ({ timeToLeaveInSeconds, steps, eta, conditionStatus }) =>
  (<Segment tertiary>
    <List divided horizontal size="huge">
      <TimeToLeave timeToLeaveInSeconds={timeToLeaveInSeconds} />
      <JourneyVisualization active steps={steps} />
      <ArriveByEstimate eta={eta} />
      <CurrentConditionsStatus conditionStatus={conditionStatus} />
    </List>
  </Segment>);

NextBestJourney.propTypes = {
  timeToLeaveInSeconds: PropTypes.number.isRequired,
  steps: PropTypes.arrayOf(PropTypes.object).isRequired,
  eta: PropTypes.string.isRequired,
  conditionStatus: PropTypes.string.isRequired,
};

NextBestJourney.defaultProps = {
  timeToLeaveInSeconds: 1,
  steps: [{}],
  eta: '',
  conditionStatus: 'on-time',
};

export default NextBestJourney;
