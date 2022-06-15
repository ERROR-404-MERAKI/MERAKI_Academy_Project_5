const connection = require("../models/db");
const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {

  if (!req.headers.authorization) {
    return res.status(403).json({
      success: false,
      message: "Forbidden",
    });
  }
  const token = req.headers.authorization.split(" ").pop();
  const SECRET = process.env.SECRET;
  jwt.verify(token, SECRET, (err, result) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: "The token is invalid or expired",
      });
    } else {
     
      req.token = result;
      next();
    }
  });
};

module.exports = { authentication };
