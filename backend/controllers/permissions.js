const connection = require("../models/db");

const createPermission = (req, res) => {
  const { permission } = req.body;
  const role_id = req.params.id;
  const query = `INSERT INTO permissions (permission) VALUES (?)`;
  const data = [permission];

  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "server error",
        err,
      });
    }
    if (result) {
      const query = `INSERT INTO role_permissions (role_id ,permission_id) VALUES (?,?)`;
      const permission_id = result.insertId;
      const data = [role_id, permission_id];

      connection.query(query, data, (err, result) => {
        if (err) {
          return res.status(500).json({
            success: false,
            massage: "server error",
            err,
          });
        }
        res.status(201).json({
          success: true,
          massage: "permissions Created",
          result,
        });
      });
    } else {
      res.status(500).json({
        success: false,
        massage: "permissions Not Created",
      });
    }
  });
};

module.exports = { createPermission };
