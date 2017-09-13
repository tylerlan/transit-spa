import React from 'react';
import PropTypes from 'prop-types';
import { Header } from 'semantic-ui-react';

const headerStyle = {
  marginTop: '0rem',
  marginBottom: '0rem',
};

const ArriveByEstimate = ({ eta }) => (
  <Header as="h4" style={headerStyle}>
    {eta}
  </Header>
);

ArriveByEstimate.propTypes = {
  eta: PropTypes.string.isRequired,
};

ArriveByEstimate.defaultProps = {
  eta: '12:34pm',
};

export default ArriveByEstimate;
