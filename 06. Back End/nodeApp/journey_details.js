import { Client } from "@googlemaps/google-maps-services-js";
import env from "dotenv";

env.config();

// Initialize Google Maps client
const client = new Client({});
let sendingTime = Math.round(Date.now() / 1000);

export const journeyDetails = async (origin, destination) => {
  try {
    // Make a request to the Directions API
    const response = await client.directions({
      params: {
        origin: origin,
        destination: destination,
        mode: "transit",
        transit_mode: "bus",
        departure_time: sendingTime, // Specify the departure time as the current time
        key: process.env.GOOGLE_MAPS_API_KEY,
      },
    });

    // Return journey details
    return {
      journey: response.data.routes[0].legs[0].distance.text,
      departure: response.data.routes[0].legs[0].departure_time.text,
      arrival: response.data.routes[0].legs[0].arrival_time.text,
    };
  } catch (err) {
    // Handle errors
    console.error(err);
    throw new Error(err.message);
  }
};

/* const origin = "7.243630047731192, 80.59471319873906";
const destination = "7.25235057321553, 80.59333382765641";


const details = await journeyDetails(origin, destination);
console.log(details); */