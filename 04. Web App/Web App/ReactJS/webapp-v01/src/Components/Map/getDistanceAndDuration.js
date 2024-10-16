/**
 * Get distance and duration between two places using Google Maps DirectionsService API.
 * @param {Object} basePoint  - The base point { lat: number, lng: number }.
 * @param {Object} pointA     - The first point { lat: number, lng: number }.
 * @param {Object} pointB     - The second point { lat: number, lng: number }.
 * @param {string} travelMode - Mode of travel (e.g., 'DRIVING', 'WALKING', 'BICYCLING', 'TRANSIT').
 * @returns {Promise<Object>} - A promise that resolves to an object containing distance and duration.
 */

const findDistanceAndDuration = (origin, destination) => {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();

    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: "DRIVING",
      },
      (response, status) => {
        if (status === "OK") {
          const route = response.routes[0].legs[0];
          //console.log("Route: ", route);
          const distance = route?.distance?.value || 0; // Distance in meters
          const duration = route?.duration?.text || "0"; // Duration in readable format (e.g., "30 mins")

          resolve({
            distanceValue: distance,
            durationValue: duration, // Duration for all modes of travel
          });
        } else {
          reject(`Error fetching route: ${status}`);
        }
      }
    );
  });
};

export default async function getDistanceAndDuration(
  basePoint,
  pointA,
  pointB
) {
  try {
    // Routing between pointA and basePoint
    const locationA = await findDistanceAndDuration(basePoint, pointA);

    // Routing between pointB and basePoint
    const locationB = await findDistanceAndDuration(basePoint, pointB);

    // Routing between pointA and pointB
    const locationAB = await findDistanceAndDuration(pointA, pointB);

    return {
      distanceA: locationA?.distanceValue,
      distanceB: locationB?.distanceValue,
      distance: locationAB?.distanceValue,
      durationA: locationA?.durationValue,
      durationB: locationB?.durationValue,
    };
  } catch (error) {
    console.error("Error fetching distance and duration:", error);
  }
}
