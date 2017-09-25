import { formatAgency, getInstructions, formatTransitGraphic } from './journeyHelpers';

const bartstep = {
  agency: 'Bay Area Rapid Transit',
  duration: '14 mins',
  headsign: 'Pittsburg/Bay Point',
  icon: undefined,
  instruction: 'Metro rail towards Pittsburg/Bay Point',
  line: undefined,
  localIcon: '//maps.gstatic.com/mapfiles/transit/iw2/6/us-ca-bart.png',
  longName: 'Pittsburg/Bay Point - SFIA/Millbrae',
  mode: 'TRANSIT',
  shortName: undefined,
  vehicle: 'Metro rail',
};

describe('formatAgency', () => {
  it('should replace Bay Area Rapid Transit with BART', () => {
    expect(formatAgency(bartstep)).toEqual('BART');
  });
});

describe('getInstructions', () => {
  it('should exist', () => {
    expect(getInstructions(bartstep)).toEqual(bartstep.instruction);
  });
});

describe('formatTransitGraphic', () => {
  it('returns object with correct keys', () => {
    expect(formatTransitGraphic('VTA', {})).toEqual({
      iconURL: null,
      lineColor: null,
      transitLine: null,
    });
  });
});
