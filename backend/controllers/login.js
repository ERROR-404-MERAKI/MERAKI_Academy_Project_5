const connection = require("../models/db");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = (req, res) => {
  const { email, password } = req.body;
  const query = `SELECT * FROM users WHERE email =(?)`;
  const data = [email.toLowerCase()];

  connection.query(query, data, (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ success: false, message: "server error", err });
    }
    if (!result.length) {
      return res
        .status(404)
        .json({ success: false, message: "The email doesn't exist" });
    }

    bcrypt.compare(password, result[0].password, async (err, response) => {
      console.log("result", result);
      if (err) {
        return res
          .status(500)
          .json({ success: false, message: "server error", err });
      }
      if (!response) {
        return res.status(403).json({
          success: false,
          message: "The password you’ve entered is incorrect",
        });
      }
      const payload = {
        userId: result[0].id,
        role_id: result[0].roleId,
        name: result[0].firstName,
      };
      const options = { expiresIn: "60m" };
      const SECRET = process.env.SECRET;

      const token = await jwt.sign(payload, SECRET, options);
      return res.status(201).json({
        success: true,
        token: token,
      });
    });
  });
};

module.exports = { login };
