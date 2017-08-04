import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import BestJourney from './BestJourney';
import NextBestJourney from './NextBestJourney';

import { fetchJourneys } from '../../actions';

function timeToLeaveConverter(departureTime) {
  const currentTime = Date.now() / 1000;

  return Math.ceil((departureTime - currentTime) / 60);
  // time to leave is in MINUTES
}

class JourneyTable extends Component {
  componentDidMount() {
    const { destinationId, origin, destinationsById } = this.props;
    this.props.fetchJourneys(destinationId, origin, destinationsById[destinationId].address);
  }

  render() {
    const { journeys } = this.props;

    if (!journeys) return <div>Loading...</div>;

    const bestJourney = journeys[0];
    const nextBestJourney = journeys[1];

    return (
      <div>
        <BestJourney
          timeToLeave={timeToLeaveConverter(bestJourney.departureTimeUTC)}
          steps={bestJourney.transitSteps}
          eta={bestJourney.arrivalTimeText}
          conditionStatus={'on-time'}
        />
        <NextBestJourney
          timeToLeave={timeToLeaveConverter(nextBestJourney.departureTimeUTC)}
          steps={nextBestJourney.transitSteps}
          eta={nextBestJourney.arrivalTimeText}
          conditionStatus={'future undertain -- see journey table'}
        />
      </div>
    );
  }
}

JourneyTable.propTypes = {
  destinationId: PropTypes.number.isRequired,
  origin: PropTypes.string.isRequired,
  destinationsById: PropTypes.object.isRequired,
  fetchJourneys: PropTypes.func.isRequired,
  // journeys: PropTypes.object.isRequired,
};

JourneyTable.defaultProps = {
  destinationId: 1,
  origin: '',
  destinationsById: { 1: {} },
  fetchJourneys: () => {},
  // journeys: { 1: [] },
  // adding this default prop crashes the program...
};

export const mapStateToProps = (state, ownProps) => {
  const origin = state.configuration.currentLocation.address;
  const destinationsById = state.destinations.byId;
  const destinationId = ownProps.id;
  const journeys = state.journeys.byDestinationId[destinationId];

  return {
    origin,
    journeys,
    destinationId,
    destinationsById,
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
