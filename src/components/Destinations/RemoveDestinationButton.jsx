import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { removeDestination } from '../../actions';

export class RemoveDestinationButton extends Component {
  // TODO: TEST buttonWasClicked

  buttonWasClicked = (e) => {
    e.preventDefault();
    this.props.removeDestination(this.props.id);
  };

  render() {
    return (
      <Button
        circular
        size="small"
        color="red"
        icon="delete"
        floated="right"
        onClick={this.buttonWasClicked}
      />
    );
  }
}

RemoveDestinationButton.propTypes = {
  removeDestination: PropTypes.func,
  id: PropTypes.number.isRequired,
};

RemoveDestinationButton.defaultProps = {
  removeDestination: () => {},
};

export const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      removeDestination,
    },
    dispatch,
  );

export default connect(null, mapDispatchToProps)(RemoveDestinationButton);
