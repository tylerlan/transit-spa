function createArrayOfJourneyObjects(json) {
  const arrayOfJouneyObjects = json.map((rawJourneyObj) => {
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
  });

  return arrayOfJouneyObjects;
}

function applyAlerts(arrayOfJouneyObjects, alerts) {
  arrayOfJouneyObjects.forEach((journeyObject) => {
    const journey = journeyObject;
    journey.alerts = [];
    if (!alerts) {
      // if there are no no alerts, say it's on-time
      journey.alerts[0] = 'on-time';
      return;
    }

    // loop through the transit steps looking for potential affected lines
    journey.transitSteps.forEach((transitStep) => {
      // loop through the alert objects
      Object.keys(alerts).forEach((index) => {
        // if there are affected lines for one alert object
        if (alerts[index].affectedLines.length) {
          // check to see if the line in the step...
          const journeyStepLine = transitStep.line;
          // ...is included in the alert
          if (alerts[index].affectedLines.includes(journeyStepLine)) {
            // if it is, push the alert description
            journey.alerts.push(index.description);
          }
          // if it isn't, do nothing
        }
      });
    });
    // if this journey has no alerts, say that it is on-time
    if (!journey.alerts.length) journey.alerts[0] = 'on-time';
  });

  return arrayOfJouneyObjects;
}

function offsetJourneys(arrayOfJouneyObjects) {
  const journeysOffset = arrayOfJouneyObjects
    .filter((journey) => {
      const currentTimeInSeconds = Date.now() / 1000;
      const diff = journey.departureTimeUTC - currentTimeInSeconds;
      const offset = 1.5;
      return diff >= offset;
    })
    .sort((a, b) => a - b);

  return journeysOffset;
}

export { createArrayOfJourneyObjects, applyAlerts, offsetJourneys };
