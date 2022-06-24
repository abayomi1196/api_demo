const express = require("express");
const dotenv = require("dotenv");

// route files
const bootcamps = require("./routes/bootcamps");

// Load env vars
dotenv.config({ path: "./config/config.env" });

// init express
const app = express();

// routes
app.use("/api/v1/bootcamps", bootcamps);

const PORT = process.env.PORT || 8888;
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port: ${PORT}`)
);
