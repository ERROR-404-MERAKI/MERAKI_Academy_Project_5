const connection = require("../models/db");
const createComment = (req, res) => {
  const { comment, date } = req.body;
  const post_id = req.params.id;
  const user_id = req.token.userId;
  const query = `INSERT INTO comments (comment ,date,post_id,user_id ) VALUES (?,?,?,?)`;
  const data = [comment, date, post_id, user_id];

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
      massage: "Success comment created",
    });
  });
};

const getCommentById = (req, res) => {
  const id = req.params.id;
  //console.log(id);
  const query = `SELECT * FROM comments INNER JOIN users ON comments.user_id = users.id WHERE comments.post_id=?`;
  const data = [id];

  connection.query(query, data, (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "Server Error",
        err: err,
      });
    }
    if (!results.length) {
      return res.status(404).json({
        success: false,
        massage: "No comment yet ..",
      });
    } else {
      res.status(200).json({
        success: true,
        massage: `The Post ${id}`,
        results: results,
      });
    }
  });
};

module.exports = {
  createComment,
  getCommentById,
};
