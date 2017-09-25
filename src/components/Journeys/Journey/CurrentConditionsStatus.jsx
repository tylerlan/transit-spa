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

const CurrentConditionsStatus = ({ conditionStatus }) => {
  const color = conditionStatus === 'on-time' ? 'green' : 'red';
  const status = conditionStatus === 'on-time' ? 'on-time' : 'delayed';

  return (
    <Popup
      trigger={
        <Label style={labelStyle} color={conditionStatus === null ? 'grey' : color}>
          {conditionStatus === null ? 'unknown' : status}
        </Label>
      }
      content={conditionStatus}
      style={popupStyle}
      offset={50}
      position="right center"
      inverted
    />
  );
};

CurrentConditionsStatus.propTypes = {
  conditionStatus: PropTypes.string.isRequired,
};

CurrentConditionsStatus.defaultProps = {
  conditionStatus: 'unknown',
};

export default CurrentConditionsStatus;
