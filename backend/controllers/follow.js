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
    console.log(result);
  });
};

module.exports = { addFollow };
