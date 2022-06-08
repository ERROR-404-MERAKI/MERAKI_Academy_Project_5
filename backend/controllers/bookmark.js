const connection = require("../models/db");

const addBookmark = (req, res) => {
  const postId = req.params.id;
  const userId = req.token.userId;
  const query = `SELECT * FROM bookmarks WHERE post_id =?`;
  const data = [postId];

  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "server error",
        err: err,
      });
    }
    if (result.length > 0) {
      const query = `UPDATE bookmarks SET is_deleted=0 WHERE post_id =? `;
      const data = [postId];

      connection.query(query, data, (err, result) => {
        if (err) {
          return res.status(500).json({
            success: false,
            massage: "server error",
            err: err,
          });
        }
        return res.status(200).json({
          success: true,
          message: "bookmark updated",
          posts: result,
        });
      });
    } else {
      const query1 = `INSERT INTO bookmarks (post_id ,user_id) VALUES (?,?)`;
      const data = [postId, userId];

      connection.query(query1, data, (err, result) => {
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
    }
  });
};

const allBookmark = (req, res) => {
  const userId = req.token.userId;
  const query = `SELECT * FROM bookmarks INNER JOIN posts ON bookmarks.post_id = posts.id WHERE bookmarks.user_Id =? AND bookmarks.is_deleted=0`;
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

const deleteBookmark = (req, res) => {
  const postId = req.params.id;
  const query = `SELECT * FROM bookmarks WHERE post_id =? AND is_deleted=0 `;
  const data = [postId];

  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Server Error",
        err,
      });
    }
    if (result) {
      const query = `UPDATE bookmarks SET is_deleted=1 WHERE post_id =?`;
      const data = [postId];

      connection.query(query, data, (err, result) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: "Server Error",
            err,
          });
        }
        if (result.changedRows > 0) {
          res.status(200).json({
            success: true,
            message: "bookmark Deleted",
            posts: result,
          });
        } else {
          res.status(404).json({
            success: false,
            message: `The post with id ⇾ ${postId} is already deleted`,
          });
        }
      });
    } else {
      res.status(404).json({
        success: false,
        message: `The post with id ⇾ ${postId} is not found`,
      });
    }
  });
};
module.exports = {
  addBookmark,
  allBookmark,
  deleteBookmark,
};
