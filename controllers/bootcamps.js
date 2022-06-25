const BootCampModel = require("../models/Bootcamp");

// @desc --> get all boot-camps
// @route --> GET /api/vi/bootcamps
// @access --> public
exports.getBootCamps = (req, res, next) => {
  res.status(200).json({ success: true, message: "Show all boot-camps" });
};

// @desc --> get single boot-camp
// @route --> GET /api/vi/bootcamps/:id
// @access --> public
exports.getBootCamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, message: `Show single bootcamp ${req.params.id}` });
};

// @desc --> create new boot-camp
// @route --> POST /api/vi/bootcamps
// @access --> public
exports.createBootCamp = async (req, res, next) => {
  try {
    const bootCamp = await BootCampModel.create(req.body);
    res.status(201).json({ success: true, data: bootCamp });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// @desc --> update boot-camp
// @route --> PUT /api/vi/bootcamps/:id
// @access --> private
exports.updateBootCamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, message: `Update bootcamp ${req.params.id}` });
};

// @desc --> delete boot-camp
// @route --> DELETE /api/vi/bootcamps/:id
// @access --> private
exports.deleteBootCamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, message: `Delete bootcamp ${req.params.id}` });
};
