import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = { count: props.seconds, expired: false };
  }

  decrementOrExpire() {
    return this.state.count > 0 ? { count: this.state.count - 1 } : { expired: true };
  }

  render() {
    const { count } = this.state;

    setTimeout(() => this.setState(this.decrementOrExpire), 1000);

    const seconds = count % 60;
    const minutes = (count - seconds) / 60;

    return this.state.expired
      ? this.props.onComplete()
      : <div>
        {minutes}:{seconds}
      </div>;
  }
}

Timer.propTypes = {
  seconds: PropTypes.number.isRequired,
  onComplete: PropTypes.func.isRequired,
};

Timer.defaultProps = {
  seconds: 6,
  onComplete: () => {},
};

export default Timer;
