import React, { Component } from 'react';
import { Grid, Container, Segment } from 'semantic-ui-react';
import CurrentLocation from './components/CurrentLocation/CurrentLocation';
import DestinationTable from './components/Destinations/DestinationTable';
import AddNewDestinationRow from './components/AddNewDestination/AddNewDestinationRow';
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
        <Segment id="current-location-container">
          <CurrentLocation />
        </Segment>

        <Container className="new-transit-container">
          <Grid className="destination-container" padded centered>
            <Grid.Column className="destination-container">
              <Grid.Row id="current-destinations-container">
                <DestinationTable />
              </Grid.Row>
              <Grid.Row className="destination-container" id="new-destinations-container">
                <Segment className="destination-container" textAlign="center">
                  <AddNewDestinationRow />
                </Segment>
              </Grid.Row>
            </Grid.Column>
          </Grid>
        </Container>
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
