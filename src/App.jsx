import React from 'react';
import { Grid, Container, Segment } from 'semantic-ui-react';
import CurrentLocation from './components/CurrentLocation/CurrentLocation';
import DestinationTable from './components/Destinations/DestinationTable';
import AddNewDestinationRow from './components/AddNewDestination/AddNewDestinationRow';
import './App.css';

const App = () =>
  (<div className="transit-container">
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
  </div>);

export default App;
