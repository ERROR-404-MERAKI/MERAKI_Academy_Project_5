const connection = require("../models/db");

const addFollow = (req, res) => {
  const person_id = req.params.id;
  const user_id = req.token.userId;

  const query = `INSERT INTO follow (person_id,user_id) VALUES (? ,?)`;
  const data = [person_id, user_id];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "server error",
        err: err,
      });
    }
    if (!result) {
      return res.status(404).json({
        success: false,
        massage: "No followers",
        err: err,
      });
    }
    res.status(201).json({
      success: true,
      result,
    });
  });
};

module.exports = { addFollow };
