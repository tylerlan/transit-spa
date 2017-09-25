import React from 'react';
import PropTypes from 'prop-types';

import { Segment } from 'semantic-ui-react';

import JourneyTable from '../Journeys/JourneyTable';
import DestinationHeader from './Destination/DestinationHeader';
import RemoveDestinationButton from './RemoveDestinationButton';
import './destination.css';

const DestinationRow = ({ id, name }) => (
  <Segment textAlign="center" compact>
    <RemoveDestinationButton id={id} />
    <DestinationHeader name={name} />
    <JourneyTable id={id} />
  </Segment>
);

DestinationRow.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

DestinationRow.defaultProps = {
  id: 1,
  name: 'Civic Center',
};

export default DestinationRow;
