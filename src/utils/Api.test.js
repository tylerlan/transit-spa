import TRANSIT_API from './Api';

describe('fetchJourneys', () => {
  const origin = '44 Tehama St, San Francisco, CA 94105, USA';
  const destination = '600 Guerrero St, San Francisco, CA 94110';
  const apiUrl = process.env.REACT_APP_API_SERVER_URL;
  const fetchURL = `${apiUrl}/directions?origin=${origin}&destination=${destination}&alternatives=true`;

  it('fetches from the directions API', () => {
    /* eslint-disable no-undef */
    spyOn(window, 'fetch').and.callThrough();
    TRANSIT_API.fetchJourneys(origin, destination);
    expect(window.fetch).toHaveBeenCalledWith(fetchURL);
  });
});

describe('getCurrentLocation', () => {
  const lat = 37.7875727;
  const lng = -122.3965973;
  const googleMapsKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const fetchURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${lat},${lng}&key=${googleMapsKey}`;

  it('fetches from the geocode API', () => {
    jest.spyOn(TRANSIT_API, 'getPosition').mockImplementation(() =>
      Promise.resolve({
        coords: {
          latitude: 37.7875727,
          longitude: -122.3965973,
        },
      }),
    );

    jest.spyOn(TRANSIT_API, 'fetchCurrentLocation').mockImplementation(() =>
      Promise.resolve({
        results: [
          'formatted_address':"44 Tehama St, San Francisco, CA 94105, USA",
        ],
      }),
    );
    /* eslint-disable no-undef */
    spyOn(window, 'fetch').and.callThrough();
    TRANSIT_API.getCurrentLocation()
      .then(() => {
        expect(TRANSIT_API.fetchCurrentLocation).toHaveBeenCalledWith(fetchURL);
      });
  });
});


describe('fetchAlerts', () => {
  const apiUrl = process.env.REACT_APP_API_SERVER_URL;
  const fetchURL = `${apiUrl}/alerts`;

  it('fetches from the geocode API', () => {
    /* eslint-disable no-undef */
    spyOn(window, 'fetch').and.callThrough();
    TRANSIT_API.fetchAlerts();

    expect(window.fetch).toHaveBeenCalledWith(fetchURL);
  });
});
