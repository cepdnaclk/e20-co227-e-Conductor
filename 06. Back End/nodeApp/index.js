import { app } from "./app.js";
import env from 'dotenv';

env.config();

// Start the server
const PORT = process.env.MYNODEPORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
