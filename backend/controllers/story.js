const connection = require("../models/db");
//Get All Story
const getAllStory = (req, res) => {
  const limit = 5;
  const page = req.query.page;
  const offset = (page - 1) * limit;
  const query = `SELECT * FROM storys WHERE is_deleted=0 LIMIT ? OFFSET ?`;
  const data = [limit, offset];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "server error",
        err: err,
      });
    }
    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        massage: "NO story's found",
      });
    }
    res.status(200).json({
      success: true,
      massage: "All the Story",
      result: result,
    });
  });
};

//===================================
//Create Story
const createStory = (req, res) => {
  const { story, date } = req.body;
  const user_id = req.token.userId;
  const query = `INSERT INTO storys (story,date,user_id) VALUES (?,?,?);`;
  const data = [story, date, user_id];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "server error",
        err: err,
      });
    }
    res.status(200).json({
      success: true,
      massage: "Create Story",
      result: result,
    });
  });
};
module.exports = {
  createStory,
  getAllStory,
};
