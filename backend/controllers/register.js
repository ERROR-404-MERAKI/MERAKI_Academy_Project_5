const connection = require("../models/db");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const register = async (req, res) => {
  const { firstName, lastName, age, ProfilePicture, email, password, roleId } =
    req.body;

  const encryptedPassword = await bcrypt.hash(password, saltRounds);

  const query = `INSERT INTO users (firstName, lastName, age, ProfilePicture, email, password, roleId) VALUES (?,?,?,?,?,?,?)`;
  const data = [
    firstName,
    lastName,
    age,
    ProfilePicture,
    email,
    encryptedPassword,
    roleId,
  ];
  connection.query(query, data, (err, result) => {
    if (err) {
      res.status(409).json({
        success: false,
        massage: "The email already exists",
        err,
      });
    }
    res.status(200).json({
      success: true,
      massage: "Account Created Successfully",
      result,
    });
  });
};

module.exports = {
  register,
};
