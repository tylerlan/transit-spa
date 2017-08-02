import React from 'react';
import PropTypes from 'prop-types';

import { Icon, List } from 'semantic-ui-react';

const ArriveByEstimate = ({ eta }) =>
  (<List.Item>
    <Icon name="clock" size="large" />
    <List.Content>
      <List.Header>ETA</List.Header>
      {eta}
    </List.Content>
  </List.Item>);

ArriveByEstimate.propTypes = {
  eta: PropTypes.string.isRequired,
};

ArriveByEstimate.defaultProps = {
  eta: '',
};

export default ArriveByEstimate;
