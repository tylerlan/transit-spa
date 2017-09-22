import { createArrayOfJourneyObjects } from './apiHelpers';

describe('createArrayOfJourneyObjects', () => {
  const data = [
    {
      legs: [
        {
          arrival_time: { text: '6:18pm' },
          departure_time: { value: 1505955345 },
          duration: { text: '23 mins' },
          end_address: '600 Guerrero St, San Francisco, CA 94110, USA',
          steps: [
            {
              distance: { text: '0.4 mi', value: 650 },
              duration: { text: '8 mins' },
              end_location: { lat: 37.789405, lng: -122.401066 },
              html_instructions: 'Walk to Montgomery St. Station',
              start_location: { lat: 37.7873889, lng: -122.3964106 },
              travel_mode: 'WALKING',
            },
          ],
        },
      ],
    },
  ];

  it('should return an array with journey objects and camel case keys', () => {
    expect(createArrayOfJourneyObjects(data)).toEqual(
      expect.arrayContaining([
        {
          arrivalTimeText: '6:18pm',
          departureTimeUTC: 1505955345,
          destination: '600 Guerrero St, San Francisco, CA 94110, USA',
          transitSteps: [
            {
              agency: '',
              duration: '8 mins',
              headsign: '',
              icon: 'N/A',
              instruction: 'Walk to Montgomery St. Station',
              line: 'N/A',
              localIcon: 'N/A',
              longName: '',
              mode: 'WALKING',
              shortName: '',
              vehicle: 'N/A',
            },
          ],
        },
      ]),
    );
  });
});
