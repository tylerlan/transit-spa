import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Segment } from 'semantic-ui-react';
import DestinationRow from './DestinationRow';

const DestinationTable = ({ destinationIds, destinationsById }) => {
  if (!destinationIds) return <div>Loading...</div>;

  return (
    <div>
      {destinationIds.map(id =>
        (<Segment key={id}>
          <DestinationRow id={id} name={destinationsById[id].address} />
        </Segment>),
      )}
    </div>
  );
};

DestinationTable.propTypes = {
  destinationIds: PropTypes.array.isRequired,
  destinationsById: PropTypes.object.isRequired,
};

DestinationTable.defaultProps = {
  destinationIds: [],
  destinationsById: { 1: {} },
};

export const mapStateToProps = (state) => {
  const destinationIds = state.destinations.ids;
  const destinationsById = state.destinations.byId;

  return {
    destinationIds,
    destinationsById,
  };
};

export default connect(mapStateToProps, null)(DestinationTable);
