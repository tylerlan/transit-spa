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
        <Container className="transit-container">
          <Grid className="transit-container" padded centered>
            <Grid.Column className="transit-container">
              <Grid.Row id="current-location-container">
                <CurrentLocation />
              </Grid.Row>
              <Grid.Row id="destinations-container">
                <DestinationTable />
              </Grid.Row>
              <Grid.Row
                className="transit-container"
                id="new-destinations-container"
              >
                <Segment className="transit-container" textAlign="center">
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
