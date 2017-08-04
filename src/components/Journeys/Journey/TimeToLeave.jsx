import React from 'react';
import PropTypes from 'prop-types';

import { Icon, List } from 'semantic-ui-react';
import Timer from './Timer';

export function timerExpired() {
  return <div>RUN!!!</div>;
}

const TimeToLeave = ({ timeToLeave }) => {
  const seconds = timeToLeave * 60;
  return (
    <List.Item>
      <Icon name="hourglass half" size="large" />
      <List.Content>
        <List.Header>leave in</List.Header>
        <Timer seconds={seconds} onComplete={timerExpired} />
      </List.Content>
    </List.Item>
  );
};

TimeToLeave.propTypes = {
  timeToLeave: PropTypes.number.isRequired,
};

TimeToLeave.defaultProps = {
  timeToLeave: 5,
};

export default TimeToLeave;
