const connection = require("../models/db");
//Get All Story
const getAllStory = (req, res) => {
  const query = `SELECT * FROM storys WHERE is_deleted=0;`;
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
      massage: "All the Story",
      result: result,
    });
  });
};

//===================================
//Create Story
const createStory = (req, res) => {
  const { story, date } = req.body;
  const user_id  = req.token.userId;
  const query = `INSERT INTO storys (story,date,user_id) VALUES (?,?,?);`;
  const data = [story, date, user_id];
  connection.query(query, data, (err, result) => {
    if (err) {
      res.status(500).json({
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
