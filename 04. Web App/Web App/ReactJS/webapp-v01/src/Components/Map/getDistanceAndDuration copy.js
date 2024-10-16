/**
 * Get distance and duration between two places using Google Maps DirectionsService API.
 * @param {Object} origin - The starting point { lat: number, lng: number }.
 * @param {Object} destination - The destination point { lat: number, lng: number }.
 * @param {string} travelMode - Mode of travel (e.g., 'DRIVING', 'WALKING', 'BICYCLING', 'TRANSIT').
 * @returns {Promise<Object>} A promise that resolves to an object containing distance and duration.
 */

const getDistanceAndDuration = (
  origin,
  destination,
  travelMode = "DRIVING"
) => {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();

    directionsService.route(
      {
        origin: origin, // Starting point, e.g., { lat: 37.7749, lng: -122.4194 }
        destination: destination, // Destination point, e.g., { lat: 34.0522, lng: -118.2437 }
        travelMode: travelMode, // Travel mode: DRIVING, WALKING, etc.
      },
      (response, status) => {
        if (status === "OK") {
          const route = response.routes[0].legs[0];
          resolve({
            distanceValue: route.distance.value, // Distance in meters
            durationValue: route.duration.value, // Duration in seconds
          });
        } else {
          reject("Directions request failed due to " + status);
        }
      }
    );
  });
};

export default getDistanceAndDuration;
