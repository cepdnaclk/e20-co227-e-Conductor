// CORS connection policy
import cors from "cors";

// Express connection
import express from "express";

// Http Errors
import createHttpError, { isHttpError } from "http-errors";

// Routes
import testRouter from "./routes/test.js";
import macRouter from "./routes/mac.js";
import userLogsRouter from "./routes/userLogs.js";
import otpRouter from "./routes/otp.js";
import usersRouter from "./routes/users.js";

// express middlewares
const app = express();

// Cors policy
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);

// Middleware to handle URL-encoded data
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Middleware to parse incoming JSON data
app.use(express.json());

// Root (Welcome Message)
app.get("/", (req, res) => {
  const msg = "Hello I'm Web App Backend!";
  console.log(msg);
  res.json(msg);
});

/* ------------------------- End points -------------------------- */
// DB Testing endpoint
app.use("/test", testRouter);

// Get MAC
app.use("/mac", macRouter);

// UserLogs
app.use("/logs/users", userLogsRouter);

// OTP handling
app.use("/OTP", otpRouter);

// Users
app.use("/users", usersRouter);

/* --------------------------------------------------------------- */

// End point not found error
app.use((req, res, next) => {
  next(createHttpError(404, "Endpoint not found!"));
});

// Error Function Middleware
app.use((err, req, res, next) => {
  console.error(err);

  // Default case error
  let errMsg = "An unknown error occured!";
  let statusCode = 500;

  // Unique error
  if (isHttpError(err)) {
    errMsg = err.message;
    statusCode = err.status;
  }

  res.status(statusCode).json({ error: errMsg });
});

export default app;
