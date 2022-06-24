/**
 * logs requests to console
 * @param {*} req http req fn
 * @param {*} res http res fn
 * @param {*} next http next fn
 */
const logger = (req, res, next) => {
  console.log(
    `${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`
  );
  next();
};

module.exports = logger;
