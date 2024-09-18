import "dotenv/config";
import app from "./app.js";
import { db } from "./db.js";

// Start the server
const PORT = process.env.MYNODEPORT;

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database");
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
