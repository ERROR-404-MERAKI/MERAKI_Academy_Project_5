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
//GetAllUsers
const getAllUser = (req, res) => {
  const query = `SELECT * FROM users WHERE is_deleted=0;`;
  connection.query(query, (err, result) => {
    if (err) {
     return res.status(500).json({
        success: false,
        massage: "server error",
        err: err,
      });
    }
    res.status(200).json({
      success: true,
      massage: "All the users",
      result: result,
    });
  });
};
//git all user by id 
const getUserById = (req, res) => {
  const id = req.params.id;
  const query = `SELECT * FROM users WHERE is_deleted=0 AND id =?`;
  const data = [id];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Server Error",
        err,
      });
    }
    if(result.length===0){
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }
    res.status(200).json({
      success: true,
      users: result,
    });
  });
};
module.exports = {
  register,getAllUser,getUserById
};
