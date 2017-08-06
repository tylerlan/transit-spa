import React from 'react';
import PropTypes from 'prop-types';

import { Icon, List } from 'semantic-ui-react';
import Timer from './Timer';

export function timerExpired() {
  return <div>RUN!!!</div>;
}

const TimeToLeave = ({ timeToLeaveInSeconds }) =>
  (<List.Item>
    <Icon name="hourglass half" size="large" />
    <List.Content>
      <List.Header>leave in</List.Header>
      <Timer seconds={timeToLeaveInSeconds} onComplete={timerExpired} />
    </List.Content>
  </List.Item>);

TimeToLeave.propTypes = {
  timeToLeaveInSeconds: PropTypes.number.isRequired,
};

TimeToLeave.defaultProps = {
  timeToLeaveInSeconds: 5,
};

export default TimeToLeave;
