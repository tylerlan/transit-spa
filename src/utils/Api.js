export default class Api {
  static fetchJourneys(origin, destination, time) {
    return fetch(
      `http://localhost:8000/directions?origin=${origin}&destination=${destination}&time=${time}`,
    ).then(response => response.json());
  }
}
