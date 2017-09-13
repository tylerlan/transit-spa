import React, { Component } from 'react';
import { Grid, Container, Segment, Menu } from 'semantic-ui-react';

import CurrentLocation from './components/CurrentLocation/CurrentLocation';
import DestinationTable from './components/Destinations/DestinationTable';
import AddNewDestinationModal from './components/AddNewDestination/AddNewDestinationModal';
import './App.css';
import { WIDGET_ID } from './constants/constants';

const PropTypes = require('prop-types');

class App extends Component {
  getChildContext() {
    return { widgetId: this.props.widgetId };
  }

  render() {
    return (
      <div className="transit-container">
        <Menu attached="top">
          <AddNewDestinationModal>New destination</AddNewDestinationModal>
          <Menu.Menu position="right">
            <div
              className="ui right aligned category search item"
              style={{ alignItems: 'baseline' }}
            >
              <CurrentLocation />
              <div className="results" />
            </div>
          </Menu.Menu>
        </Menu>

        <Segment attached="bottom">
          <Container className="new-transit-container">
            <Grid className="destination-container" padded centered>
              <Grid.Column className="destination-container">
                <Grid.Row>
                  <DestinationTable />
                </Grid.Row>
              </Grid.Column>
            </Grid>
          </Container>
        </Segment>
      </div>
    );
  }
}

App.propTypes = {
  widgetId: PropTypes.string.isRequired,
};

App.defaultProps = {
  widgetId: WIDGET_ID,
};

App.childContextTypes = {
  widgetId: PropTypes.string,
};

export default App;
