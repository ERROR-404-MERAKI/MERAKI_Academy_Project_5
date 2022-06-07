const connection = require("../models/db");

const addBookmark = (req, res) => {
  const postId = req.params.id;
  const userId = req.token.userId;
  const query = `INSERT INTO bookmarks (post_id ,user_id) VALUES (?,?)`;
  const data = [postId, userId];

  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "server error",
        err: err,
      });
    }

    res.status(201).json({

      success: true,
      massage: "Success bookmark added",
      result,
    });
  });
};

const allBookmark = (req, res) => {
  const userId = req.token.userId;
  const query = `SELECT * FROM bookmarks INNER JOIN posts ON bookmarks.post_id = posts.id WHERE bookmarks.user_Id =? `;
  const data = [userId];

  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Server Error",
        err,
      });
    }
    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No bookmark to show",
      });
    }
    res.status(200).json({
      success: true,
      posts: result,
    });
  });
};
module.exports = {
  addBookmark,
  allBookmark,
};
