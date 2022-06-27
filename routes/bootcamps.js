const express = require("express");
const router = express.Router();

const {
  getBootCamp,
  createBootCamp,
  deleteBootCamp,
  getBootCamps,
  updateBootCamp,
  getBootCampsInRadius
} = require("../controllers/bootcamps");

// get bootCamps in radius
router.get("/radius/:zipcode/:distance", getBootCampsInRadius);

// get all bootcamps
router.get("/", getBootCamps);

// get single bootcamp
router.get("/:id", getBootCamp);

// create bootcamp
router.post("/", createBootCamp);

// update bootcamp
router.put("/:id", updateBootCamp);

// delete bootcamp
router.delete("/:id", deleteBootCamp);

module.exports = router;
