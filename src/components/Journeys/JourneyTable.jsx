import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BestJourney from './BestJourney';
import NextBestJourney from './NextBestJourney';

import { connect } from 'react-redux';
import { fetchJourneys } from '../../actions';
import { bindActionCreators } from 'redux';

function timeToLeaveConverter(currentTimeStamp, futureTimeStamp) {
  return Math.ceil((futureTimeStamp - currentTimeStamp) / 60);
  // time to leave is in MINUTES
}
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

export class JourneyTable extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('MOUNTING');
    this.props.fetchJourneys(this.props.id, origin, TEST_destsById[this.props.id].address);
  }

  render() {
    const { journeys } = this.props;

    if (!journeys) return <div>Loading...</div>;

    const bestJourney = journeys[0];
    const nextBestJourney = journeys[1];

    return (
      <div>
        <BestJourney
          timeToLeave={timeToLeaveConverter(currentTime.value, bestJourney.departureTimeUTC)}
          steps={bestJourney.transitSteps}
          eta={bestJourney.arrivalTimeText}
          conditionStatus={'Delayed'}
        />
        <NextBestJourney
          timeToLeave={timeToLeaveConverter(currentTime.value, nextBestJourney.departureTimeUTC)}
          steps={nextBestJourney.transitSteps}
          eta={nextBestJourney.arrivalTimeText}
          conditionStatus={'On-Time'}
        />
      </div>
    );
  }
}

export const mapStateToProps = (state, ownProps) => {
  const journeysByDestinationId = state.journeys.byDestinationId;
  // console.log('RAW JOURNEYS:', journeysByDestinationId);

  const destinationId = ownProps.id;
  // console.log('PASSED IN ID:', destinationId);

  const journeys = state.journeys.byDestinationId[destinationId];
  // console.log('JOURNEYS:', journeys);

  return {
    journeys,
  };
};

export const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchJourneys,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(JourneyTable);

//
// const JourneyTable = ({ id }) => {
//   const { timeToLeave, steps, eta, conditionStatus } = journeysByDestId[id][0];
//   return (
//     <div>
//       <BestJourney
//         timeToLeave={timeToLeave}
//         steps={steps}
//         eta={eta}
//         conditionStatus={conditionStatus}
//       />
//       <NextBestJourney
//         timeToLeave={journeysByDestId[id][1].timeToLeave}
//         steps={journeysByDestId[id][1].steps}
//         eta={journeysByDestId[id][1].eta}
//         conditionStatus={journeysByDestId[id][1].conditionStatus}
//       />
//     </div>
//   );
// };
//
// JourneyTable.propTypes = {
//   id: PropTypes.number.isRequired,
// };
//
// JourneyTable.defaultProps = {
//   id: 1,
// };
//
// export default JourneyTable;
