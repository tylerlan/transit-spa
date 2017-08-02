import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';

class AddNewDestinationForm extends Component {
  state = { destination: '' };

  handleChange = (e, { destination, value }) => this.setState({ [destination]: value });

  handleSubmit = () => this.setState({ destination: '' });

  render() {
    const { destination } = this.state;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group>
          <Form.Input
            placeholder="New destination"
            destination="destination"
            value={destination}
            onChange={this.handleChange}
          />
          <Form.Button content="Submit" color="green" onClick={this.props.onClick} />
        </Form.Group>
      </Form>
    );
  }
}

AddNewDestinationForm.propTypes = {
  onClick: PropTypes.func.isRequired,
};

AddNewDestinationForm.defaultProps = {
  onClick: () => {},
};

export default AddNewDestinationForm;
