import React from 'react';
import PropTypes from 'prop-types';

import BestJourney from './BestJourney';
import NextBestJourney from './NextBestJourney';
import { journey1, journey2 } from '../../seeds/mapsApiSample';

function timeToLeaveConverter(currentTimeStamp, futureTimeStamp) {
  return Math.ceil((futureTimeStamp - currentTimeStamp) / 60);
}

const currentTime = { text: '11:40pm', value: 1501566738 };

function getTransitSteps(journeyNum) {
  return journeyNum.legs[0].steps.map((step) => {
    const modeWasTransit = step.travel_mode === 'TRANSIT';

    return modeWasTransit
      ? `${step.transit_details.line.short_name} ${step.transit_details.line.name} ${step
        .transit_details.line.vehicle.name} to ${step.transit_details.departure_stop.name}`
      : `${step.duration.text} ${step.html_instructions}`;
  });
}

const journeysByDestId = {
  1: [
    {
      currentTime: currentTime.text,
      address: journey1.legs[0].end_address,
      timeToLeave: timeToLeaveConverter(currentTime.value, journey1.legs[0].departure_time.value),
      steps: getTransitSteps(journey1),
      eta: journey1.legs[0].arrival_time.text,
      conditionStatus: 'on-time',
    },
    {
      currentTime: currentTime.text,
      address: journey1.legs[0].end_address,
      timeToLeave: 18,
      steps: [],
      eta: '12:13pm',
      conditionStatus: 'on-time',
    },
  ],
  2: [
    {
      currentTime: currentTime.text,
      address: journey2.legs[0].end_address,
      timeToLeave: timeToLeaveConverter(currentTime.value, journey2.legs[0].departure_time.value),
      steps: getTransitSteps(journey2),
      eta: journey2.legs[0].arrival_time.text,
      conditionStatus: 'delayed',
    },
    {
      currentTime: currentTime.text,
      address: journey2.legs[0].end_address,
      timeToLeave: 12,
      steps: [],
      eta: '12:37pm',
      conditionStatus: 'on-time',
    },
  ],
};

const JourneyTable = ({ id }) => {
  const { timeToLeave, steps, eta, conditionStatus } = journeysByDestId[id][0];
  return (
    <div>
      <BestJourney
        timeToLeave={timeToLeave}
        steps={steps}
        eta={eta}
        conditionStatus={conditionStatus}
      />
      <NextBestJourney
        timeToLeave={journeysByDestId[id][1].timeToLeave}
        steps={journeysByDestId[id][1].steps}
        eta={journeysByDestId[id][1].eta}
        conditionStatus={journeysByDestId[id][1].conditionStatus}
      />
    </div>
  );
};

JourneyTable.propTypes = {
  id: PropTypes.number.isRequired,
};

JourneyTable.defaultProps = {
  id: 1,
};

export default JourneyTable;
