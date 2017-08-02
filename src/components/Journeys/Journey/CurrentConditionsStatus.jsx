import React from 'react';
import PropTypes from 'prop-types';

import { Icon, List, Popup } from 'semantic-ui-react';

const style = {
  borderRadius: 0,
  opacity: 0.7,
  padding: '2em',
};

const CurrentConditionsStatus = ({ conditionStatus }) =>
  (<List.Item>
    <List.Content>
      <List.Header>status:</List.Header>
      <Popup
        trigger={
          <Icon
            name={conditionStatus === 'on-time' ? 'checkmark' : 'exclamation triangle'}
            size="large"
          />
        }
        content={conditionStatus}
        style={style}
        offset={50}
        position="right center"
        inverted
      />
    </List.Content>
  </List.Item>);

CurrentConditionsStatus.propTypes = {
  conditionStatus: PropTypes.string.isRequired,
};

CurrentConditionsStatus.defaultProps = {
  conditionStatus: '',
};

export default CurrentConditionsStatus;
