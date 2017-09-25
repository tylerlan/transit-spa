import React from 'react';
import PropTypes from 'prop-types';

import { Header } from 'semantic-ui-react';

import TimeToLeave from './Journey/TimeToLeave';
import JourneyVisualization from './Journey/JourneyVisualization';
import ArriveByEstimate from './Journey/ArriveByEstimate';
import CurrentConditionsStatus from './Journey/CurrentConditionsStatus';

import '../../App.css';

const headerStyle = {
  marginTop: '0px',
  marginBottom: '0px',
};

const journeyRowStyle = {
  alignItems: 'center',
  display: 'inline-flex',
  padding: '0.5rem',
  clear: 'both',
  margin: 'auto',
};

const minStyle = {
  padding: 'inherit',
  minWidth: '80px',
};

const JourneyRow = ({ timeToLeaveInSeconds, steps, eta, conditionStatus, refreshJourneys }) => (
  <div className="journey-row" style={journeyRowStyle}>
    <div style={minStyle}>
      <p style={headerStyle}>leave in</p>
      <TimeToLeave timeToLeaveInSeconds={timeToLeaveInSeconds} refreshJourneys={refreshJourneys} />
    </div>

    <div style={minStyle}>
      <JourneyVisualization steps={steps} />
    </div>
    <div style={minStyle}>
      <Header as="h4" style={headerStyle}>
        arrive by
      </Header>
      <ArriveByEstimate eta={eta} />
      <CurrentConditionsStatus conditionStatus={conditionStatus} />
    </div>
  </div>
);

JourneyRow.propTypes = {
  timeToLeaveInSeconds: PropTypes.number.isRequired,
  steps: PropTypes.arrayOf(PropTypes.object).isRequired,
  eta: PropTypes.string.isRequired,
  conditionStatus: PropTypes.string.isRequired,
  refreshJourneys: PropTypes.func.isRequired,
};

JourneyRow.defaultProps = {
  timeToLeaveInSeconds: 1,
  steps: [{}],
  eta: '',
  conditionStatus: 'on-time',
  refreshJourneys: () => {},
};

export default JourneyRow;
