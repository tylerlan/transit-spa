import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Loader } from 'semantic-ui-react';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = { currentCount: props.seconds };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.decrement(), 1000);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ currentCount: nextProps.seconds });
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  decrement() {
    const newCount = this.state.currentCount - 1;

    if (newCount >= 1) {
      this.setState({ currentCount: newCount });
    }

    if (newCount === 0) {
      this.props.onComplete();
      clearInterval(this.timerID);
    }
  }

  render() {
    const { currentCount } = this.state;

    const sec = currentCount % 60;
    const min = (currentCount - sec) / 60;

    const seconds = sec < 10 ? `0${sec}` : sec;
    const minutes = min < 10 ? `0${min}` : min;

    return (
      <div>
        {currentCount <= 1 ? (
          <Loader active inline="centered" />
        ) : (
          <div>
            {minutes}:{seconds}
          </div>
        )}
      </div>
    );
  }
}

Timer.propTypes = {
  seconds: PropTypes.number.isRequired,
  onComplete: PropTypes.func.isRequired,
};

export default Timer;
