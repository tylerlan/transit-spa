import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = { count: props.seconds, expired: false };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ count: nextProps.seconds });
  }

  decrementOrExpire() {
    return this.state.count > 0 ? { count: this.state.count - 1 } : { expired: true };
  }

  render() {
    const { count } = this.state;

    setTimeout(() => this.setState(this.decrementOrExpire), 1000);

    const sec = count % 60;
    const min = (count - sec) / 60;

    const seconds = sec < 10 ? `0${sec}` : sec;
    const minutes = min < 10 ? `0${min}` : min;

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
