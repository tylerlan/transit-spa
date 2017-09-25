import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Loader, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { updateCurrentLocation } from '../../actions';
import injectWidgetId from '../../utils/utils';

export class CurrentLocation extends Component {
  componentDidMount() {
    this.props.updateCurrentLocation();
  }

  render() {
    const { geolocating, currentLocation } = this.props;

    return (
      <div id="current-location-text">
        {geolocating ? (
          <div>
            <Icon name="location arrow" color="grey" size="small" />
            <Loader active inline indeterminate />
          </div>
        ) : (
          <div>
            <p>
              <Icon name="location arrow" color="green" size="small" />
              {currentLocation.address}
            </p>
          </div>
        )}
      </div>
    );
  }
}

CurrentLocation.propTypes = {
  geolocating: PropTypes.bool.isRequired,
  currentLocation: PropTypes.shape({
    address: PropTypes.string,
    lat: PropTypes.number,
    lng: PropTypes.number,
  }).isRequired,
  updateCurrentLocation: PropTypes.func.isRequired,
};

CurrentLocation.defaultProps = {
  geolocating: true,
  currentLocation: {
    address: 'Tehama St, San Francisco, CA 94105',
    lat: 37.7873889,
    lng: -122.3964106,
  },
  updateCurrentLocation: () => {},
};

export const mapStateToProps = (state, ownProps) => {
  const id = ownProps.widgetId;
  const geolocating = state.widgets.byId[id].configuration.geolocating;
  const currentLocation = state.widgets.byId[id].configuration.currentLocation;

  return {
    geolocating,
    currentLocation,
  };
};

export const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateCurrentLocation,
    },
    dispatch,
  );

export default injectWidgetId(connect(mapStateToProps, mapDispatchToProps)(CurrentLocation));
