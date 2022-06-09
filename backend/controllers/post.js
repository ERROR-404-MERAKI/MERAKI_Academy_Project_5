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

// function to get All posts
const getAllPost = (req, res) => {
  const limit = 5;
  const page = req.query.page;
  const offset = (page - 1) * limit;
  const query =
    "SELECT * FROM posts INNER JOIN users ON posts.user_id = users.id WHERE posts.is_deleted=0 limit " +
    limit +
    " OFFSET " +
    offset;

  connection.query(query, (err, result) => {
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
        message: "No posts to show",
      });
    }
    res.status(200).json({
      success: true,
      posts: result,
    });
  });
};

// function to get post by id
const getPostById = (req, res) => {
  const user_id = req.token.userId;
  const limit = 12;
  const page = req.query.page;
  const offset = (page - 1) * limit;
  const query = `SELECT * FROM posts WHERE is_deleted=0 AND user_id =? LIMIT ? OFFSET ?`;
  const data = [user_id, limit, offset];
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
        message: "No posts to show",
      });
    }
    res.status(200).json({
      success: true,
      posts: result,
    });
  });
};

// function to get post by id
const getPostByProfileId = (req, res) => {
  const user_id = req.params.id;
  const query = `SELECT * FROM posts WHERE is_deleted=0 AND user_id =?`;
  const data = [user_id];
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
        message: "No posts to show",
      });
    }
    res.status(200).json({
      success: true,
      posts: result,
    });
  });
};

// update posts by id
const updatePostById = (req, res) => {
  const post_id = req.params.id;
  const { media, description, newLikes } = req.body;

  const query = `SELECT * FROM posts WHERE id=?`;
  const data = [post_id];

  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Server Error",
        err,
      });
    }
    // console.log(likes);
    if (!result.length) {
      return res.status(404).json({
        success: false,
        message: "post not found",
      });
    }
    const query = `UPDATE posts SET media = ? , description =? , likes=? WHERE id =?`;
    const data = [
      media || result[0].media,
      description || result[0].description,
      newLikes,

      post_id,
    ];

    connection.query(query, data, (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Server Error",
          err,
        });
      }
      return res.status(201).json({
        success: true,
        message: "post Updated",
        posts: result,
      });
    });
  });
};

const deletePostById = (req, res) => {
  const post_id = req.params.id;
  const query = `Update posts SET is_deleted=1 WHERE id =? `;
  const data = [post_id];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Server Error",
        err,
      });
    }
    if (result.changedRows > 0) {
      return res.status(201).json({
        success: true,
        message: "post Deleted",
        posts: result,
      });
    }
    res.status(404).json({
      success: false,
      message: `The post with id ⇾ ${post_id} is not found`,
    });
  });
};
module.exports = {
  createNewPost,
  getAllPost,
  getPostById,
  updatePostById,
  deletePostById,
  getPostByProfileId,
};
