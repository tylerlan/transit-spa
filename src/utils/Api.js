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

  static getCurrentLocation() {
    const getPosition = options =>
    new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });

    return getPosition().then((position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      const location = { lat, lng };
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${lat},${lng}&key=${googleMapsKey}`;
      return fetch(url)
      .then(response => response.json())
      .then((data) => {
        location.address = data.results[0].formatted_address;
        return location;
      })
      .catch(e => e);
    });
  }

  static fetchAlerts() {
    return fetch(
      `${apiUrl}/alerts`,
    )
    .then(response => response.json())
    .catch(e => e);
  }
}
