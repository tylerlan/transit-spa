import React from 'react';
import PropTypes from 'prop-types';

import { Popup, Label } from 'semantic-ui-react';

const labelStyle = {
  marginTop: '0.5rem',
  marginBottom: '0rem',
};

const popupStyle = {
  borderRadius: 0,
  opacity: 0.7,
  padding: '2em',
};

const CurrentConditionsStatus = ({ conditionStatus }) => (
  <Popup
    trigger={
      <Label style={labelStyle} color={conditionStatus === 'on-time' ? 'green' : 'red'}>
        {conditionStatus === 'on-time' ? 'on-time' : 'delayed'}
      </Label>
    }
    content={conditionStatus}
    style={popupStyle}
    offset={50}
    position="right center"
    inverted
  />
);

CurrentConditionsStatus.propTypes = {
  conditionStatus: PropTypes.string.isRequired,
};

CurrentConditionsStatus.defaultProps = {
  conditionStatus: '',
};

export default CurrentConditionsStatus;
