import React from 'react';
import PropTypes from 'prop-types';

import { Icon, List } from 'semantic-ui-react';

const TimeToLeaveTimer = ({ timeToLeave }) =>
  (<List.Item>
    <Icon name="hourglass half" size="large" />
    <List.Content>
      <List.Header>leave in</List.Header>
      {timeToLeave} min{' '}
    </List.Content>
  </List.Item>);

TimeToLeaveTimer.propTypes = {
  timeToLeave: PropTypes.number.isRequired,
};

TimeToLeaveTimer.defaultProps = {
  timeToLeave: 1,
};

export default TimeToLeaveTimer;
