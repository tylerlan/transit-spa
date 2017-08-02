import React from 'react';
import { Segment } from 'semantic-ui-react';
import DestinationRow from './DestinationRow';
import { journey1, journey2 } from '../../seeds/mapsApiSample';

const testDests = [
  {
    id: 1,
    name: 'Place 1',
    address: journey1.legs[0].end_address,
  },
  {
    id: 2,
    name: 'Place 2',
    address: journey2.legs[0].end_address,
  },
];

const DestinationTable = () =>
  (<div>
    {testDests.map(dest =>
      (<Segment key={dest.id}>
        <DestinationRow id={dest.id} name={dest.name} address={dest.address} />
      </Segment>),
    )}
  </div>);
export default DestinationTable;
