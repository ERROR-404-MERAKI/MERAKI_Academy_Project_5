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
  const query = `SELECT * FROM posts WHERE is_deleted=0`;
  connection.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Server Error",
        err,
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
    if(result.length===0){
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }
    res.status(200).json({
      success: true,
      posts: result,
    });
  });
};

//==================
//git all user by id 
const getUserById = (req, res) => {
  const user_id = req.params.id;
  const query = `SELECT * FROM users WHERE is_deleted=0 AND user_id =?`;
  const data = [user_id];
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

module.exports = { createNewPost, getAllPost, getPostById };
