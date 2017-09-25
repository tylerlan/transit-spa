import { timeToLeaveConverter } from './journeyTableHelpers';

describe('timeToLeaveConverter', () => {
  it('should return positive integer', () => {
    const futureTimeInSeconds = Date.now() + 1000;
    expect(timeToLeaveConverter(futureTimeInSeconds)).toBeGreaterThanOrEqual(1);
  });
});
