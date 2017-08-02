import React, { Component } from 'react';
import { Header, Modal } from 'semantic-ui-react';
import AddNewDestinationButton from './AddNewDestinationButton';
import AddNewDestinationForm from './AddNewDestinationForm';

class AddNewDestinationModal extends Component {
  constructor(props) {
    super(props);

    this.state = { modalOpen: false };
  }

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
        <Modal.Content>
          <h3>Enter new destination below</h3>
        </Modal.Content>
        <Modal.Actions>
          <AddNewDestinationForm onClick={this.handleClose} />
        </Modal.Actions>
      </Modal>
    );
  }
}

export default AddNewDestinationModal;
