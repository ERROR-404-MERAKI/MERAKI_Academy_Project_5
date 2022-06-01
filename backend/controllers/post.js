const connection = require("../models/db");

// function to creat a post
const createNewPost = (req, res) => {
  const { media, description, date, likes } = req.body;
  const user_id = req.token.userId;
  const query = `INSERT INTO posts (media, description, date,likes,user_id) VALUES (?,?,?,?,?);`;
  const data = [media, description, date, likes, user_id];

  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "Server error",
        err: err,
      });
    }
    res.status(200).json({
      success: true,
      massage: "Post created",
      result: result,
    });
  });
};

module.exports = { createNewPost };
