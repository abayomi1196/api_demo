const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

const connectDB = require("./config/db");

// Load env vars
dotenv.config({ path: "./config/config.env" });

// connect to mongo db
connectDB();

// route files
const bootcamps = require("./routes/bootcamps");

// init express
const app = express();

// dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// routes
app.use("/api/v1/bootcamps", bootcamps);

const PORT = process.env.PORT || 8888;
const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port: ${PORT}`)
);

// handle all unhandled rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);

  // close server & exit process
  server.close(() => process.exit(1));
});
