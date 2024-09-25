import { Client } from "@googlemaps/google-maps-services-js";
import env from "dotenv";

env.config();

// Initialize Google Maps client
const client = new Client({});

export const journeyDetails = async (
  startLocation, // Start location coordinates (lat, lng)
  fromLocation, // From bus stop coordinates (lat, lng)
  toLocation, // To bus stop coordinates (lat, lng)
  date, // Date in 'YYYY-MM-DD' format
  time // Time in 'HH:mm' format
) => {
  console.log("\nStart Location: ", startLocation); // Start point coordinates
  console.log("From Location: ", fromLocation); // First bus stop
  console.log("To Location: ", toLocation); // Final destination bus stop
  console.log("Date: ", date); // Date in 'YYYY-MM-DD'
  console.log("Time: ", time); // Time in 'HH:mm'

  try {
    // Split the provided date and time
    const dateParts = date.split("-"); // Split the date into year, month, day
    const timeParts = time.split(":"); // Split the time into hours and minutes

    // Create a JavaScript Date object with the provided date and time
    const departureDate = new Date(
      parseInt(dateParts[0]), // Year
      parseInt(dateParts[1]) - 1, // Month (0-indexed in JS)
      parseInt(dateParts[2]), // Day
      parseInt(timeParts[0]), // Hours
      parseInt(timeParts[1]) // Minutes
    );

    // Convert to UNIX timestamp (seconds since epoch)
    const departureTime = Math.floor(departureDate.getTime() / 1000);

    // 1. Calculate journey from startLocation to fromLocation
    const fromResponse = await client.directions({
      params: {
        origin: startLocation,
        destination: fromLocation,
        mode: "transit",
        transit_mode: "bus",
        departure_time: departureTime, // Use the given date and time
        key: process.env.GOOGLE_MAPS_API_KEY,
      },
    });

    const fromLeg = fromResponse.data.routes[0].legs[0];

    // 2. Calculate journey from startLocation to toLocation
    const toResponse = await client.directions({
      params: {
        origin: startLocation,
        destination: toLocation,
        mode: "transit",
        transit_mode: "bus",
        departure_time: departureTime, // Use the given date and time
        key: process.env.GOOGLE_MAPS_API_KEY,
      },
    });

    const toLeg = toResponse.data.routes[0].legs[0];

    const distance = 0.001 * (toLeg.distance.value - fromLeg.distance.value);

    console.log(
      `From: ${fromLeg.distance.value}  To: ${toLeg.distance.value}  Distance: ${distance}`
    );

    // Return all calculated details
    return {
      departureTime: fromLeg.arrival_time ? fromLeg.arrival_time.text : "N/A",
      arrivalTime: toLeg.arrival_time ? toLeg.arrival_time.text : "N/A",
      distance,
    };
  } catch (err) {
    // Handle errors
    console.error(err);
    throw new Error(err.message);
  }
};
