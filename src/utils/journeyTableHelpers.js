/* eslint-disable import/prefer-default-export */
export function timeToLeaveConverter(departureTimeInSeconds) {
  const currentTimeInSeconds = Date.now() / 1000;
  const diff = departureTimeInSeconds - currentTimeInSeconds;
  return Math.floor(diff);
}
