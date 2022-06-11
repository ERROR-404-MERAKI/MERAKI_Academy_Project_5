const connection = require("../models/db");
const createRole = (req, res) => {
  const { role } = req.body;
  const query = `INSERT INTO roles (role) VALUES (?)`;
  const data = [role];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "server error*",
        err: err,
      });
    }
    res.status(201).json({
      success: true,
      massage: "Success role created",
    });
  });
};
module.exports = {
  createRole,
};
