const express = require("express");
const dotenv = require("dotenv");

// Load env vars
dotenv.config({ path: "./config/config.env" });

// init express
const app = express();

// routes
app.get("/api/v1/bootcamps", (req, res) => {
  res.status(200).json({ success: true, message: "Show all bootcamps" });
});

app.post("/api/v1/bootcamps", (req, res) => {
  res.status(200).json({ success: true, message: "Create new  bootcamp" });
});

app.put("/api/v1/bootcamps/:id", (req, res) => {
  res
    .status(200)
    .json({ success: true, message: `Update bootcamp ${req.params.id}` });
});

app.get("/api/v1/bootcamps/:id", (req, res) => {
  res
    .status(200)
    .json({ success: true, message: `Show single bootcamp ${req.params.id}` });
});

app.delete("/api/v1/bootcamps/:id", (req, res) => {
  res
    .status(200)
    .json({ success: true, message: `Delete bootcamp ${req.params.id}` });
});

const PORT = process.env.PORT || 8888;
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port: ${PORT}`)
);
