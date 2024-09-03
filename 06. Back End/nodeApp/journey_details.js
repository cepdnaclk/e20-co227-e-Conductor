import distance from "google-distance-matrix";
import env from "dotenv";

env.config();

let sendingTime = Math.round(Date.now() / 1000);

distance.key(process.env.GOOGLE_MAPS_API_KEY);
distance.transit_mode("bus");
distance.departure_time(sendingTime);

export const journeyDetails = async (origin, destination) => {
  return new Promise((resolve, reject) => {
    distance.matrix(origin, destination, (err, distances) => {
      if (err) {
        return reject(err.message);
      }
      if (!distances) {
        return reject("no distances");
      }
      if (distances.status === "OK") {
        let currentTimestamp = Date.now();
        let departureTime = new Date(currentTimestamp);
        let arrivalTime = new Date(
          currentTimestamp + distances.rows[0].elements[0].duration.value * 1000
        );

        resolve({
          journey: distances.rows[0].elements[0].distance.text,
          departure: `${departureTime
            .getHours()
            .toString()
            .padStart(2, "0")}:${departureTime
            .getMinutes()
            .toString()
            .padStart(2, "0")}`,
          arrival: `${arrivalTime
            .getHours()
            .toString()
            .padStart(2, "0")}:${arrivalTime
            .getMinutes()
            .toString()
            .padStart(2, "0")}`,
        });
      }
    });
  });
};

// Usage with async/await
/* (async () => {
    try {
      const details = await journeyDetails(origin, destination);
      console.log(details);
    } catch (error) {
      console.log(error);
    }
  })(); */
