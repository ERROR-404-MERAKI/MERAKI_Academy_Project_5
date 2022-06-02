const connection = require("../models/db");

const authorization = (string) => {
  return function (req, res, next) {
    const role_id = req.token.role_id;
    const query = `SELECT * FROM role_permissions AS RP INNER JOIN permissions AS P ON RP.permission_id = P.id WHERE RP.role_id =(?) AND P.permission =(?) `;
    const data = [role_id, string];

    connection.query(query, data, (err, result) => {
      if (result.length) {
        next();
      } else {
        res.status(400).json({
          success: false,
          massage: "Unauthorized",
        });
      }
    });
  };
};

module.exports = { authorization };
