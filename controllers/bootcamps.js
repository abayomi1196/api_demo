const BootCampModel = require("../models/Bootcamp");

// @desc --> get all boot-camps
// @route --> GET /api/vi/bootcamps
// @access --> public
exports.getBootCamps = async (req, res, next) => {
  try {
    const bootCamps = await BootCampModel.find();

    res
      .status(200)
      .json({ success: true, count: bootCamps.length, data: bootCamps });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// @desc --> get single boot-camp
// @route --> GET /api/vi/bootcamps/:id
// @access --> public
exports.getBootCamp = async (req, res, next) => {
  try {
    const bootCamp = await BootCampModel.findById(req.params.id);

    if (!bootCamp) {
      return res.status(400).json({ success: false });
    }

    res.status(200).json({ success: true, data: bootCamp });
  } catch (err) {
    res.status(400).json({ success: false });
  }
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
exports.updateBootCamp = async (req, res, next) => {
  try {
    const bootCamp = await BootCampModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!bootCamp) {
      return res.status(400).json({ success: false });
    }

    res.status(200).json({ success: true, data: bootCamp });
  } catch (err) {
    return res.status(400).json({ success: false });
  }
};

// @desc --> delete boot-camp
// @route --> DELETE /api/vi/bootcamps/:id
// @access --> private
exports.deleteBootCamp = async (req, res, next) => {
  try {
    const bootCamp = await BootCampModel.findByIdAndDelete(req.params.id);

    if (!bootCamp) {
      return res.status(400).json({ success: false });
    }

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    return res.status(400).json({ success: false });
  }
};
