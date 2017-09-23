import React, { Component } from 'react';
import { Header, Modal } from 'semantic-ui-react';
import AddNewDestinationButton from './AddNewDestinationButton';
import PlacesAutocompleteForm from './PlacesAutocompleteForm';

class AddNewDestinationModal extends Component {
  constructor(props) {
    super(props);

    this.state = { modalOpen: false };
  }

  // TODO: TEST SIMULATE OPEN AND CLOSE

  handleOpen = () =>
    this.setState({
      modalOpen: true,
    });

  handleClose = () =>
    this.setState({
      modalOpen: false,
    });

  render() {
    return (
      <Modal
        trigger={
          <AddNewDestinationButton onClick={this.handleOpen}>Show Modal</AddNewDestinationButton>
        }
        open={this.state.modalOpen}
        onClose={this.handleClose}
        basic
        size="small"
      >
        <Header icon="compose" content="Add new destination" />
        <Modal.Actions>
          <PlacesAutocompleteForm onClick={this.handleClose} />
        </Modal.Actions>
      </Modal>
    );
  }
}

export default AddNewDestinationModal;
