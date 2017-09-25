const googleMapsKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
const apiUrl = process.env.REACT_APP_API_SERVER_URL;

export default class TRANSIT_API {
  static fetchJourneys(origin, destination) {
    return fetch(
      `${apiUrl}/directions?origin=${origin}&destination=${destination}&alternatives=true`,
    )
      .then(response => response.json())
      .catch(e => e);
  }

  static getPosition(options) {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  }

  static fetchCurrentLocation(url) {
    return fetch(url).then(response => response.json());
  }

  static getCurrentLocation() {
    return this.getPosition()
      .then(async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const locationObj = { lat, lng };
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${lat},${lng}&key=${googleMapsKey}`;

        const locationInfo = await this.fetchCurrentLocation(url);

        return { locationObj, locationInfo };
      })
      .then((data) => {
        const { locationObj, locationInfo } = data;
        locationObj.address = locationInfo.results[0].formatted_address;
        return locationObj;
      })
      .catch(e => e);
  }

  static fetchAlerts() {
    return fetch(`${apiUrl}/alerts`)
      .then(response => response.json())
      .catch(e => e);
  }
}
