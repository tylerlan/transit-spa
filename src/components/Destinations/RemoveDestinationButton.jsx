import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { removeDestination } from '../../actions';

export class RemoveDestinationButton extends React.Component {

  buttonWasClicked = (e) => {
    e.preventDefault();
    this.props.removeDestination(this.props.id);
  }

  render() {
    return (
      <Button
        icon="window close"
        size="mini"
        float="right"
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

const mapDispatchToProps = dispatch => bindActionCreators({
  removeDestination,
}, dispatch);

export default connect(
  null,
  mapDispatchToProps,
)(RemoveDestinationButton);
