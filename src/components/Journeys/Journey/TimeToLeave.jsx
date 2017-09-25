import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Header } from 'semantic-ui-react';
import Timer from './Timer';

const headerStyle = {
  marginTop: '0rem',
  marginBottom: '0rem',
};

class TimeToLeave extends Component {
  constructor(props) {
    super(props);

    this.timerExpired = this.timerExpired.bind(this);
  }

  timerExpired() {
    this.props.refreshJourneys();
  }

  render() {
    const { timeToLeaveInSeconds } = this.props;

    return (
      <Header as="h1" color="grey" style={headerStyle}>
        <Timer seconds={timeToLeaveInSeconds} onComplete={this.timerExpired} />
      </Header>
    );
  }
}

TimeToLeave.propTypes = {
  timeToLeaveInSeconds: PropTypes.number.isRequired,
  refreshJourneys: PropTypes.func.isRequired,
};

TimeToLeave.defaultProps = {
  timeToLeaveInSeconds: 5,
  refreshJourneys: () => {},
};

export default TimeToLeave;
