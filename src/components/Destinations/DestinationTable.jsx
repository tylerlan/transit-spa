import React from 'react';
import { Segment } from 'semantic-ui-react';
import DestinationRow from './DestinationRow';

// /////////////////////////////////////////////////////////////////

const currentTime = { text: '11:40pm', value: 1501566738 };
const origin = '44 Tehama St, San Francisco, CA 94105';

const TEST_ids = [1, 2];

const TEST_destsById = {
  1: {
    id: 1,
    address: '200 2nd St, Oakland, CA 94607, USA',
  },
  2: {
    id: 2,
    address: '1354 Hayes St, San Francisco, CA 94117, USA',
  },
};

// /////////////////////////////////////////////////////////////////

const DestinationTable = () =>
  (<div>
    {TEST_ids.map(id =>
      (<Segment key={id}>
        <DestinationRow
          id={id}
          name={TEST_destsById[id].address}
          address={TEST_destsById.address}
        />
      </Segment>),
    )}
  </div>);
export default DestinationTable;
