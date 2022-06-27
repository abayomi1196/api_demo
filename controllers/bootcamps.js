const geocoder = require("../utils/geocoder");
const BootCampModel = require("../models/Bootcamp");
const ErrorResponse = require("../utils/errorResponse");
const AsyncHandler = require("../middlewares/async");

// @desc --> get all boot-camps
// @route --> GET /api/vi/bootcamps
// @access --> public
exports.getBootCamps = AsyncHandler(async (req, res, next) => {
  const bootCamps = await BootCampModel.find();

  res
    .status(200)
    .json({ success: true, count: bootCamps.length, data: bootCamps });
});

// @desc --> get single boot-camp
// @route --> GET /api/vi/bootcamps/:id
// @access --> public
exports.getBootCamp = AsyncHandler(async (req, res, next) => {
  const bootCamp = await BootCampModel.findById(req.params.id);

  if (!bootCamp) {
    return next(
      new ErrorResponse(`Boot-camp not found with id: ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: bootCamp });
});

// @desc --> create new boot-camp
// @route --> POST /api/vi/bootcamps
// @access --> public
exports.createBootCamp = AsyncHandler(async (req, res, next) => {
  const bootCamp = await BootCampModel.create(req.body);
  res.status(201).json({ success: true, data: bootCamp });
});

// @desc --> update boot-camp
// @route --> PUT /api/vi/bootcamps/:id
// @access --> private
exports.updateBootCamp = AsyncHandler(async (req, res, next) => {
  const bootCamp = await BootCampModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  if (!bootCamp) {
    return next(
      new ErrorResponse(`Boot-camp not found with id: ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: bootCamp });
});

// @desc --> delete boot-camp
// @route --> DELETE /api/vi/bootcamps/:id
// @access --> private
exports.deleteBootCamp = AsyncHandler(async (req, res, next) => {
  const bootCamp = await BootCampModel.findByIdAndDelete(req.params.id);

  if (!bootCamp) {
    return next(
      new ErrorResponse(`Boot-camp not found with id: ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: {} });
});

// @desc --> get boot-camps within a certain radius
// @route --> GET /api/vi/bootcamps/radius/:zipcode/:distance
// @access --> public
exports.getBootCampsInRadius = AsyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;

  // get lat/lng from geocoder
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  // calc radius in radians
  // distance / earth's radius (3,963mi / 6378km)
  const radius = distance / 3963;

  const bootCamps = await BootCampModel.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } }
  });

  res.status(200).json({
    success: true,
    count: bootCamps.length,
    data: bootCamps
  });
});
