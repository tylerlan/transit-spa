const googleMapsKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
const apiUrl = process.env.REACT_APP_API_SERVER_URL;

export default class TRANSIT_API {
  static fetchJourneys(origin, destination) {
    return fetch(
      `${apiUrl}/directions?origin=${origin}&destination=${destination}&alternatives=true`,
    )
      .then(response => response.json())
      .then(json =>
        json.map((rawJourneyObj) => {
          const journeyObj = {
            destination: rawJourneyObj.legs[0].end_address,
            arrivalTimeText: rawJourneyObj.legs[0].arrival_time.text,
            departureTimeUTC: rawJourneyObj.legs[0].departure_time.value,

            transitSteps: rawJourneyObj.legs[0].steps.map((step) => {
              const mode = step.travel_mode;
              const duration = step.duration.text;
              const instruction = step.html_instructions;

              const agency = step.transit_details ? step.transit_details.line.agencies[0].name : '';
              const line = step.transit_details ? step.transit_details.line.short_name : 'N/A';
              const vehicle = step.transit_details ? step.transit_details.line.vehicle.name : 'N/A';
              const shortName = step.transit_details ? step.transit_details.line.short_name : ''; // mostly for buses
              const longName = step.transit_details ? step.transit_details.line.name : ''; // mostly for BART
              const headsign = step.transit_details ? step.transit_details.headsign : '';
              const icon = step.transit_details ? step.transit_details.line.icon : 'N/A'; // mostly for buses
              const localIcon = step.transit_details
                ? step.transit_details.line.vehicle.local_icon
                : 'N/A'; // mostly for BART

              const stepObj = {
                mode,
                duration,
                instruction,
                agency,
                line,
                vehicle,
                shortName,
                longName,
                headsign,
                icon,
                localIcon,
              };
              return stepObj;
            }),
          };

          return journeyObj;
        }),
      )
      .then(journeys => journeys)
      .catch((e) => {
        console.dir('ERROR IN FETCH JOURNEYS', e);
      });
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
    return fetch(`${apiUrl}/alerts`)
      .then(response => response.json())
      .catch((e) => {
        console.log('ERROR IN FETCH ALERTS', e);
      });
  }
}
